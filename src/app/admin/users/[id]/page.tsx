
import { prisma } from "@/lib/prisma";
import EditUserClient from "./user-client";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditUserPage({
  params,
}: Props) {

  const user = await prisma.user.findUnique({

    where: {
      id: params.id,
    },

  });

  if (!user) {

    return (

      <div className="p-10">

        User not found.

      </div>

    );

  }

  return (

    <EditUserClient
      user={user}
    />

  );

}
