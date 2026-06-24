
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PostsTable from "@/components/dashboard/PostsTable";
import { signOut } from "next-auth/react";


export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const isReporter = session.user.role === "REPORTER";

  const filter = isReporter
    ? {
        author: {
          email: session.user.email!,
        },
      }
    : {};

  const totalPosts = await prisma.post.count({
    where: filter,
  });

  const draftPosts = await prisma.post.count({
    where: {
      ...filter,
      status: "DRAFT",
    },
  });

  const pendingPosts = await prisma.post.count({
    where: {
      ...filter,
      status: "PENDING",
    },
  });

  const rejectedPosts = await prisma.post.count({
    where: {
      ...filter,
      status: "REJECTED",
    },
  });

  const publishedPosts = await prisma.post.count({
    where: {
      ...filter,
      status: "PUBLISHED",
    },
  });

 

  return (

        <div className="p-6">

      <div className="mb-8">
      <h1 className="text-4xl font-bold">
  Welcome, {session.user.name} 👋
</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Link href="/dashboard/posts">
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 hover:shadow-lg">
            <h3 className="font-semibold text-blue-700">Total Posts</h3>
            <p className="text-3xl font-bold text-blue-700">{totalPosts}</p>
          </div>
        </Link>

        <Link href="/dashboard/posts?status=DRAFT">
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 hover:shadow-lg">
            <h3 className="font-semibold text-yellow-700">Draft Posts</h3>
            <p className="text-3xl font-bold text-yellow-700">{draftPosts}</p>
          </div>
        </Link>

        <Link href="/dashboard/posts?status=PENDING">
          <div className="bg-purple-100 border border-purple-300 rounded-lg p-4 hover:shadow-lg">
            <h3 className="font-semibold text-purple-700">Pending Posts</h3>
            <p className="text-3xl font-bold text-purple-700">{pendingPosts}</p>
          </div>
        </Link>

        <Link href="/dashboard/posts?status=REJECTED">
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 hover:shadow-lg">
            <h3 className="font-semibold text-red-700">Rejected Posts</h3>
            <p className="text-3xl font-bold text-red-700">{rejectedPosts}</p>
          </div>
        </Link>

        <Link href="/dashboard/posts?status=PUBLISHED">
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 hover:shadow-lg">
            <h3 className="font-semibold text-green-700">Published Posts</h3>
            <p className="text-3xl font-bold text-green-700">{publishedPosts}</p>
          </div>
        </Link>

      </div>
    </div>
  );
}
