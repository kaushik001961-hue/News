import { writeFile } from "fs/promises";

import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const data = await req.formData();

  const file = data.get("file") as File;

  if (!file)

    return NextResponse.json({

      error: true,

    });

  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const filename = Date.now() + "-" + file.name;

  await writeFile(

    `./public/uploads/${filename}`,

    buffer

  );

  return NextResponse.json({

    url: `/uploads/${filename}`,

  });

}