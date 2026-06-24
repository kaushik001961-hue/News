"use client";

import { useEffect, useState } from "react";

interface Item {
  id: string;
  name: string;
}

interface Props {
  states?: Item[];

  stateId: string;
  districtId: string;
  talukaId: string;
  village: string;

  setStateId: (id: string) => void;
  setDistrictId: (id: string) => void;
  setTalukaId: (id: string) => void;
  setVillage: (name: string) => void;
}

export default function LocationSelector({
  states = [],

  stateId,
  districtId,
  talukaId,
  village,

  setStateId,
  setDistrictId,
  setTalukaId,
  setVillage,
}: Props) {
  const [districts, setDistricts] = useState<Item[]>([]);
  const [talukas, setTalukas] = useState<Item[]>([]);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingTalukas, setLoadingTalukas] = useState(false);

  // -------------------------
  // Load Districts
  // -------------------------
  useEffect(() => {
    if (!stateId) {
      setDistricts([]);
      setTalukas([]);
      setDistrictId("");
      setTalukaId("");
      return;
    }

    const fetchDistricts = async () => {
      try {
        setLoadingDistricts(true);

        const res = await fetch(`/api/districts?stateId=${stateId}`);
        const data = await res.json();

        setDistricts(Array.isArray(data) ? data : []);
        setDistrictId("");
        setTalukaId("");
        setTalukas([]);
      } catch (err) {
        console.error("District fetch error:", err);
        setDistricts([]);
      } finally {
        setLoadingDistricts(false);
      }
    };

    fetchDistricts();
  }, [stateId]);

  // -------------------------
  // Load Talukas
  // -------------------------
  useEffect(() => {
    if (!districtId) {
      setTalukas([]);
      setTalukaId("");
      return;
    }

    const fetchTalukas = async () => {
      try {
        setLoadingTalukas(true);

        const res = await fetch(`/api/talukas?districtId=${districtId}`);
        const data = await res.json();

        setTalukas(Array.isArray(data) ? data : []);
        setTalukaId("");
      } catch (err) {
        console.error("Taluka fetch error:", err);
        setTalukas([]);
      } finally {
        setLoadingTalukas(false);
      }
    };

    fetchTalukas();
  }, [districtId]);

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold">News Location</h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* ---------------- STATE ---------------- */}
        <div>
          <label className="font-semibold">State</label>

          <select
            value={stateId}
            onChange={(e) => setStateId(e.target.value)}
            className="mt-2 w-full rounded-xl border p-3"
          >
            <option value="">Select State</option>

            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* ---------------- DISTRICT ---------------- */}
        <div>
          <label className="font-semibold">District</label>

          <select
            value={districtId}
            onChange={(e) => setDistrictId(e.target.value)}
            className="mt-2 w-full rounded-xl border p-3"
            disabled={!stateId || loadingDistricts}
          >
            <option value="">
              {loadingDistricts ? "Loading..." : "Select District"}
            </option>

            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        {/* ---------------- TALUKA ---------------- */}
        <div>
          <label className="font-semibold">Taluka</label>

          <select
            value={talukaId}
            onChange={(e) => setTalukaId(e.target.value)}
            className="mt-2 w-full rounded-xl border p-3"
            disabled={!districtId || loadingTalukas}
          >
            <option value="">
              {loadingTalukas ? "Loading..." : "Select Taluka"}
            </option>

            {talukas.map((taluka) => (
              <option key={taluka.id} value={taluka.id}>
                {taluka.name}
              </option>
            ))}
          </select>
        </div>

        {/* ---------------- VILLAGE ---------------- */}
        <div>
          <label className="font-semibold">Village / Area</label>

          <input
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            className="mt-2 w-full rounded-xl border p-3"
            placeholder="Enter Village / Area"
          />
        </div>
      </div>
    </div>
  );
}