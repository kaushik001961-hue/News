const comments = [

  {
    user: "Rahul",
    comment: "Excellent article!",
  },

  {
    user: "Priya",
    comment: "Very informative.",
  },

  {
    user: "Karan",
    comment: "Nice coverage.",
  },

];

export default function LatestComments() {

  return (

    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <h2 className="mb-4 text-xl font-bold">

        Latest Comments

      </h2>

      <div className="space-y-3">

        {comments.map((item, index) => (

          <div
            key={index}
            className="border-b pb-2"
          >

            <div className="font-semibold">

              {item.user}

            </div>

            <div className="text-sm text-gray-500">

              {item.comment}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}
