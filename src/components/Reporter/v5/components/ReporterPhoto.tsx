import Image from "next/image";

interface Props {
  photo?: string;
}

export default function ReporterPhoto({
  photo,
}: Props) {
  return (
    <div className="mx-auto h-24 w-20 overflow-hidden rounded-lg border-[3px] border-yellow-400 shadow-lg">
      {photo ? (
        <Image
          src={photo}
          alt="Reporter"
          width={120}
          height={150}
          className="h-full w-full object-cover"
          unoptimized
        />
      ) : (
        <div className="flex h-full items-center justify-center text-[8px] text-gray-400">
          No Photo
        </div>
      )}
    </div>
  );
}