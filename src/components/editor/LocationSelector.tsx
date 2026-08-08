"use client";

import { useEffect, useState } from "react";

interface StateItem {
  id: string;
  name: string;
}

interface DistrictItem {
  id: string;
  name: string;
}

interface TalukaItem {
  id: string;
  name: string;
}

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
  const [states, setStates] = useState<StateItem[]>([]);
  const [districts, setDistricts] = useState<DistrictItem[]>([]);
  const [talukas, setTalukas] = useState<TalukaItem[]>([]);

  // -----------------------------
  // Load States
  // -----------------------------
  useEffect(() => {
    async function loadStates() {
      try {
        const res = await fetch("/api/states");
        const data = await res.json();
        setStates(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadStates();
  }, []);

  // -----------------------------
  // Load Districts
  // -----------------------------
  useEffect(() => {
    if (!stateId) {
      setDistricts([]);
      setDistrictId("");
      return;
    }

    async function loadDistricts() {
      try {
        const res = await fetch(
          `/api/districts?stateId=${stateId}`
        );

        const data = await res.json();

        setDistricts(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadDistricts();
  }, [stateId]);

  // -----------------------------
  // Load Talukas
  // -----------------------------
  useEffect(() => {
    if (!districtId) {
      setTalukas([]);
      setTalukaId("");
      return;
    }

    async function loadTalukas() {
      try {
        const res = await fetch(
          `/api/talukas?districtId=${districtId}`
        );

        const data = await res.json();

        setTalukas(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadTalukas();
  }, [districtId]);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h3 className="text-lg font-semibold mb-5">
        Location
      </h3>

      <div className="grid gap-5 md:grid-cols-2">

        {/* State */}

        <div>
          <label className="font-medium">
            State
          </label>

          <select
            value={stateId}
            onChange={(e) => {
              setStateId(e.target.value);
              setDistrictId("");
              setTalukaId("");
            }}
            className="mt-2 w-full rounded-lg border p-3"
          >
            <option value="">
              Select State
            </option>

            {states.map((state) => (
              <option
                key={state.id}
                value={state.id}
              >
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* District */}

        <div>
          <label className="font-medium">
            District
          </label>

          <select
            value={districtId}
            onChange={(e) => {
              setDistrictId(e.target.value);
              setTalukaId("");
            }}
            disabled={!stateId}
            className="mt-2 w-full rounded-lg border p-3 disabled:bg-gray-100"
          >
            <option value="">
              Select District
            </option>

            {districts.map((district) => (
              <option
                key={district.id}
                value={district.id}
              >
                {district.name}
              </option>
            ))}
          </select>
        </div>

        {/* Taluka */}

        <div>
          <label className="font-medium">
            Taluka
          </label>

          <select
            value={talukaId}
            onChange={(e) =>
              setTalukaId(e.target.value)
            }
            disabled={!districtId}
            className="mt-2 w-full rounded-lg border p-3 disabled:bg-gray-100"
          >
            <option value="">
              Select Taluka
            </option>

            {talukas.map((taluka) => (
              <option
                key={taluka.id}
                value={taluka.id}
              >
                {taluka.name}
              </option>
            ))}
          </select>
        </div>

        {/* Village */}

        <div>
          <label className="font-medium">
            Village
          </label>

          <input
            value={village}
            onChange={(e) =>
              setVillage(e.target.value)
            }
            placeholder="Village"
            className="mt-2 w-full rounded-lg border p-3"
          />
        </div>

      </div>

    </div>
  );
}