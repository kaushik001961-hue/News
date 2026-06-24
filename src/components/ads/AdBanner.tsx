interface Props {
  image: string;
  title: string;
  url: string;
  id: string;
}

export default function AdBanner({
  image,
  title,
  url,
  id,
}: Props) {
  return (
    <a
      href={`/api/ads/${id}/click`}
      target="_blank"
    >
      <img
        src={image}
        alt={title}
        className="w-full rounded"
      />
    </a>
  );
}