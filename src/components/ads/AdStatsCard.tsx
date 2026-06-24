interface Props {
  impressions: number;
  clicks: number;
}

export default function AdStatsCard({
  impressions,
  clicks,
}: Props) {
  const ctr =
    impressions > 0
      ? ((clicks / impressions) * 100).toFixed(2)
      : "0";

  return (
    <div className="rounded border p-4">
      <p>Impressions: {impressions}</p>

      <p>Clicks: {clicks}</p>

      <p>CTR: {ctr}%</p>
    </div>
  );
}