<section>
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-4xl font-bold">
      Editor's Picks
    </h2>

    <span className="text-red-600 font-semibold">
      Curated Stories
    </span>
  </div>

  <div className="grid md:grid-cols-2 gap-8">
    {latestPosts.slice(0, 2).map((post) => (
      <Link
        key={post.id}
        href={`/news/${post.slug}`}
        className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition"
      >
        <div className="relative h-72">
          <img
            src={post.image || "/placeholder.jpg"}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold line-clamp-2">
            {post.title}
          </h3>

          <p className="mt-3 text-gray-600 line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </Link>
    ))}
  </div>
</section>