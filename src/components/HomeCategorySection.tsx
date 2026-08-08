interface Props {
  title: string;
  posts: any[];
}

export default function HomeCategorySection({
  title,
  posts,
}: Props) {
  return (
    <section>

      <h2 className="text-3xl font-bold mb-6">
        {title}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {posts.map((post) => (

          <div key={post.id} className="border rounded-xl p-5">

            <h3 className="font-bold">
              {post.title}
            </h3>

          </div>

        ))}

      </div>

    </section>
  );
}