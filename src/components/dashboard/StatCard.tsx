interface Props {
  title: string;
  value: number;
}

export default function StatCard({
  title,
  value,
}: Props) {

  return (

    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h3 className="text-gray-500">

        {title}

      </h3>

      <div className="mt-3 text-4xl font-bold">

        {value}

      </div>

    </div>

  );

}
