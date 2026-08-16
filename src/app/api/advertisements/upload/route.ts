import { NextResponse } from "next/server";
import crypto from "crypto";

import { auth } from "@/lib/auth";

/* =========================================================
   CLOUDINARY CONFIG
========================================================= */

const CLOUDINARY_CLOUD_NAME =
  process.env.CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_API_KEY =
  process.env.CLOUDINARY_API_KEY;

const CLOUDINARY_API_SECRET =
  process.env.CLOUDINARY_API_SECRET;

/* =========================================================
   POST /api/advertisements/upload
========================================================= */

export async function POST(
  request: Request
) {
  try {
    /* =====================================================
       AUTHENTICATION
    ===================================================== */

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    /* =====================================================
       PERMISSION
    ===================================================== */

    const role = session.user.role;

    if (
      role !== "ADMIN" &&
      role !== "EDITOR"
    ) {
      return NextResponse.json(
        {
          error:
            "You do not have permission to upload advertisements.",
        },
        {
          status: 403,
        }
      );
    }

    /* =====================================================
       CLOUDINARY CONFIG CHECK
    ===================================================== */

    if (
      !CLOUDINARY_CLOUD_NAME ||
      !CLOUDINARY_API_KEY ||
      !CLOUDINARY_API_SECRET
    ) {
      console.error(
        "Cloudinary environment variables are missing."
      );

      return NextResponse.json(
        {
          error:
            "Cloudinary configuration is missing on the server.",
        },
        {
          status: 500,
        }
      );
    }

    /* =====================================================
       FORM DATA
    ===================================================== */

    const formData =
      await request.formData();

    const file =
      formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error:
            "Please select an image file.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       FILE TYPE
    ===================================================== */

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Only JPG, PNG, WEBP and GIF images are allowed.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       FILE SIZE

       Maximum: 10 MB
    ===================================================== */

    const MAX_FILE_SIZE =
      10 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error:
            "Advertisement image must be smaller than 10 MB.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       READ FILE
    ===================================================== */

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    /* =====================================================
       CLOUDINARY TIMESTAMP
    ===================================================== */

    const timestamp =
      Math.floor(
        Date.now() / 1000
      );

    /* =====================================================
       CLOUDINARY FOLDER
    ===================================================== */

    const folder =
      "ags-news/advertisements";

    /* =====================================================
       SIGNATURE

       Cloudinary signature is generated from
       timestamp + folder.
    ===================================================== */

    const signatureString =
      `folder=${folder}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;

    const signature =
      crypto
        .createHash("sha1")
        .update(signatureString)
        .digest("hex");

    /* =====================================================
       CLOUDINARY FORM DATA
    ===================================================== */

    const cloudinaryForm =
      new FormData();

    const blob =
      new Blob(
        [buffer],
        {
          type: file.type,
        }
      );

    cloudinaryForm.append(
      "file",
      blob,
      file.name
    );

    cloudinaryForm.append(
      "api_key",
      CLOUDINARY_API_KEY
    );

    cloudinaryForm.append(
      "timestamp",
      String(timestamp)
    );

    cloudinaryForm.append(
      "folder",
      folder
    );

    cloudinaryForm.append(
      "signature",
      signature
    );

    /* =====================================================
       CLOUDINARY UPLOAD
    ===================================================== */

    const cloudinaryResponse =
      await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: cloudinaryForm,
        }
      );

    const result =
      await cloudinaryResponse.json();

    if (
      !cloudinaryResponse.ok ||
      !result.secure_url
    ) {
      console.error(
        "CLOUDINARY UPLOAD ERROR:",
        result
      );

      return NextResponse.json(
        {
          error:
            result?.error?.message ||
            "Cloudinary upload failed.",
        },
        {
          status: 500,
        }
      );
    }

    /* =====================================================
       SUCCESS
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        url: result.secure_url,

        publicId:
          result.public_id,

        width:
          result.width,

        height:
          result.height,

        format:
          result.format,

        bytes:
          result.bytes,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "ADVERTISEMENT UPLOAD ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to upload advertisement image.",
      },
      {
        status: 500,
      }
    );
  }
}