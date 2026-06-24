interface Props {
  htmlCode: string;
}

export default function AdHtml({
  htmlCode,
}: Props) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: htmlCode,
      }}
    />
  );
}