
interface Props {
  total: number;
  admins: number;
  editors: number;
  reporters: number;
  active: number;
  blocked: number;
}

export default function UserStats({
  total,
  admins,
  editors,
  reporters,
  active,
  blocked,
}: Props) {
  const stats = [
    {
      title: "Total Users",
      value: total,
    },
    {
      title: "Admins",
      value: admins,
    },
    {
      title: "Editors",
      value: editors,
    },
    {
      title: "Reporters",
      value: reporters,
    },
    {
      title: "Active",
      value: active,
    },
    {
      title: "Blocked",
      value: blocked,
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-6">

      {stats.map((item) => (

        <div
          key={item.title}
          className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
        >

          <div className="text-sm text-gray-500">
            {item.title}
          </div>

          <div className="mt-2 text-3xl font-bold">
            {item.value}
          </div>

        </div>

      ))}

    </div>
  );
}
