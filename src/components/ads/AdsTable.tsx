interface Props {
  ads: any[];
}

export default function AdsTable({ ads }: Props) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Title</th>
          <th>Position</th>
          <th>Impressions</th>
          <th>Clicks</th>
          <th>CTR</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {ads.map((ad) => {
          // The correct calculation happens safely right here inside the loop scope
          const ctr =
            ad.impressions > 0
              ? ((ad.clicks / ad.impressions) * 100).toFixed(2)
              : "0";

          return (
            <tr key={ad.id}>
              <td>{ad.title}</td>
              <td>{ad.position}</td>
              <td>{ad.impressions}</td>
              <td>{ad.clicks}</td>
              <td>{ctr}%</td>
              <td>{ad.active ? "Active" : "Inactive"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}