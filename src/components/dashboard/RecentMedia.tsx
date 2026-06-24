interface Props {
  media: any[];
}

export default function RecentMedia({
  media,
}: Props) {

  return (

    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <h2 className="mb-4 text-xl font-bold">

        Recent Media

      </h2>

      <div className="grid grid-cols-4 gap-3">

        {media.map((item) => (

          <img
            key={item.id}
            src={item.url}
            className="aspect-square rounded-lg object-cover"
            alt=""
          />

        ))}

      </div>

    </div>

  );

}
