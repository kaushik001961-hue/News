"use client";

import Link from "next/link";

export default function PostsTable({
  posts,
}: {
  posts: any[];
}) {

  return (

<div className="bg-white rounded-xl shadow overflow-hidden">

<table className="w-full">

<thead className="bg-gray-100">

<tr>

<th className="p-4">Image</th>

<th>Title</th>

<th>Reporter</th>

<th>Status</th>

<th>Date</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{posts.map((post)=>(

<tr
key={post.id}
className="border-b hover:bg-gray-50"
>

<td className="p-3">

<img

src={post.image || "/news-placeholder.jpg"}

className="w-20 h-14 object-cover rounded"

alt=""

/>

</td>

<td>

{post.title}

</td>

<td>

{post.author?.name}

</td>

<td>

<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

{post.status}

</span>

</td>

<td>

{new Date(post.createdAt).toLocaleDateString()}

</td>

<td>

<div className="flex gap-2">

<Link

href={`/admin/posts/edit/${post.id}`}

className="bg-blue-600 text-white px-3 py-1 rounded"

>

Edit

</Link>

<button

className="bg-red-600 text-white px-3 py-1 rounded"

>

Delete

</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}