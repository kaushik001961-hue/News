"use client";

interface Props {
  stateId: string;
  districtId: string;
  talukaId: string;
  village: string;

  setStateId: (value: string) => void;
  setDistrictId: (value: string) => void;
  setTalukaId: (value: string) => void;
  setVillage: (value: string) => void;
}

export default function LocationSelector({
  stateId,
  districtId,
  talukaId,
  village,
  setStateId,
  setDistrictId,
  setTalukaId,
  setVillage,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-5 text-xl font-semibold">
        Location
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        <input
          value={stateId}
          onChange={(e) => setStateId(e.target.value)}
          placeholder="State ID"
          className="rounded-lg border p-3"
        />

        <input
          value={districtId}
          onChange={(e) => setDistrictId(e.target.value)}
          placeholder="District ID"
          className="rounded-lg border p-3"
        />

        <input
          value={talukaId}
          onChange={(e) => setTalukaId(e.target.value)}
          placeholder="Taluka ID"
          className="rounded-lg border p-3"
        />

        <input
          value={village}
          onChange={(e) => setVillage(e.target.value)}
          placeholder="Village"
          className="rounded-lg border p-3"
        />
      </div>
    </div>
  );
}