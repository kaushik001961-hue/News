
"use client";

import Link from "next/link";
import Image from "next/image";
import AdSlot from "@/components/ads/AdSlot";

import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

const posts = [
  {
    id: 1,
    title: "India signs new technology partnership",
    image: "/placeholder.jpg",
    category: "Technology",
    reporter: "Manju Yadav",
    status: "Published",
    views: 1245,
    date: "19 Jun 2026",
  },
  {
    id: 2,
    title: "Stock market reaches all time high",
    image: "/placeholder.jpg",
    category: "Business",
    reporter: "Kaushik Bhatt",
    status: "Draft",
    views: 0,
    date: "--",
  },
];

export default function AdminPostsPage() {
  return (
    <div className="p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Posts
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all news articles
          </p>

        </div>

        <Link
          href="/admin/posts/create"
          className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-xl"
        >
          <Plus size={18} />
          New Article
        </Link>

      </div>

      {/* Stats */}

      <div className="grid lg:grid-cols-4 gap-5 mb-8">

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Total Posts</p>
          <h2 className="text-3xl font-bold mt-2">145</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Published</p>
          <h2 className="text-3xl font-bold mt-2 text-green-600">
            120
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Draft</p>
          <h2 className="text-3xl font-bold mt-2 text-orange-500">
            15
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-3xl font-bold mt-2 text-blue-600">
            10
          </h2>
        </div>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-2xl shadow p-5 mb-8">

        <div className="grid lg:grid-cols-4 gap-4">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-4 text-gray-400"
            />

            <input
              placeholder="Search..."
              className="border rounded-xl pl-10 p-3 w-full"
            />

          </div>

          <select className="border rounded-xl p-3">
            <option>All Categories</option>
          </select>

          <select className="border rounded-xl p-3">
            <option>All Reporters</option>
          </select>

          <select className="border rounded-xl p-3">
            <option>All Status</option>
          </select>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Image
              </th>

              <th className="text-left">
                Title
              </th>

              <th className="text-left">
                Category
              </th>

              <th className="text-left">
                Reporter
              </th>

              <th className="text-left">
                Status
              </th>

              <th className="text-left">
                Views
              </th>

              <th className="text-left">
                Published
              </th>

              <th className="text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {posts.map((post) => (

              <tr
                key={post.id}
                className="border-t"
              >

                <td className="p-4">

                  <Image
                    src={post.image}
                    alt={post.title}
                    width={80}
                    height={60}
                    className="rounded-lg object-cover"
                  />

                </td>

                <td className="font-semibold">
                  {post.title}
                </td>

                <td>
                  {post.category}
                </td>

                <td>
                  {post.reporter}
                </td>

                <td>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">

                    {post.status}

                  </span>

                </td>

                <td>
                  {post.views}
                </td>

                <td>
                  {post.date}
                </td>

                <td>

                  <div className="flex gap-3">

                    <button>
                      <Eye size={18} />
                    </button>

                    <button>
                      <Pencil size={18} />
                    </button>

                    <button>
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
