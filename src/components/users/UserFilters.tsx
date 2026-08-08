"use client";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  role: string;
  setRole: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  bulkAction: string;
  setBulkAction: (value: string) => void;

  onApplyBulk: () => void;
  onReset: () => void;
}

export default function UserFilters({
  search,
  setSearch,
  role,
  setRole,
  status,
  setStatus,
  bulkAction,
  setBulkAction,
  onApplyBulk,
  onReset,
}: Props) {

  return (

    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <div className="grid gap-4 lg:grid-cols-5">

        {/* Search */}

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search name or email..."
          className="rounded-lg border p-3"
        />

        {/* Role */}

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          className="rounded-lg border p-3"
        >

          <option value="">
            All Roles
          </option>

          <option value="ADMIN">
            Admin
          </option>

          <option value="EDITOR">
            Editor
          </option>

          <option value="REPORTER">
            Reporter
          </option>

        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="rounded-lg border p-3"
        >

          <option value="">
            All Status
          </option>

          <option value="ACTIVE">
            Active
          </option>

          <option value="BLOCKED">
            Blocked
          </option>

          <option value="PENDING">
            Pending
          </option>

        </select>

        {/* Bulk Action */}

        <select
          value={bulkAction}
          onChange={(e) =>
            setBulkAction(e.target.value)
          }
          className="rounded-lg border p-3"
        >

          <option value="">
            Bulk Action
          </option>

          <option value="DELETE">
            Delete
          </option>

          <option value="BLOCK">
            Block
          </option>

          <option value="ACTIVATE">
            Activate
          </option>

        </select>

        {/* Buttons */}

        <div className="flex gap-2">

          <button
            type="button"
            onClick={onApplyBulk}
            className="rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
          >
            Apply
          </button>

          <button
            type="button"
            onClick={onReset}
            className="rounded-lg border px-4 py-3 hover:bg-gray-100"
          >
            Reset
          </button>

        </div>

      </div>

    </div>

  );

}
