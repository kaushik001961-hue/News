interface Props {
  posts: any[];
}

export default function RecentPosts({
  posts,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <h2 className="mb-4 text-xl font-bold">
        Recent Posts
      </h2>

      <div className="space-y-3">

        {posts.map((post) => (

          <div
            key={post.id}
            className="border-b pb-3"
          >

            <div className="font-semibold">

              {post.title}

            </div>

            <div className="text-sm text-gray-500">

              {post.category?.name}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
