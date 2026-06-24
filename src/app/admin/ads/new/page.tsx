import AdvertisementForm from "@/components/ads/AdvertisementForm";

import {
  createAdvertisement,
} from "@/features/advertisements/actions/create-ad";

export default function NewAdvertisementPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-3xl font-bold">
        Create Advertisement
      </h1>

      <AdvertisementForm
        action={createAdvertisement}
      />
    </div>
  );
}