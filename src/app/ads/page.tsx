import {
  getAdvertisements,
} from "@/features/advertisements/queries/advertisement.query";

export default async function AdsPage() {
  const ads =
    await getAdvertisements();

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Advertisements
      </h1>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Position</th>
            <th>Clicks</th>
            <th>Impressions</th>
          </tr>
        </thead>

        <tbody>
          {ads.map((ad) => (
            <tr key={ad.id}>
              <td>{ad.title}</td>

              <td>{ad.position}</td>

              <td>{ad.clicks}</td>

              <td>{ad.impressions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}