const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
];

export default function IndustriesGrid() {
  return (
    <section className="grid md:grid-cols-3 gap-6 py-12">
      {industries.map((industry) => (
        <div
          key={industry}
          className="border rounded-lg p-6 shadow-sm"
        >
          <h3 className="font-semibold text-lg">
            {industry}
          </h3>
        </div>
      ))}
    </section>
  );
}