"use client";

import { useState } from "react";
import MediaCard from "./MediaCard";
import MediaPreviewDialog from "./MediaPreviewDialog";
import BulkMediaActions from "./BulkMediaActions";
import DeleteMediaDialog from "./DeleteMediaDialog";

export interface MediaItem {
  id: string;
  url: string;
  title?: string;
  type?: string;
  size?: number;
  createdAt?: string | Date;
  fileName?: string;
  originalName?: string;
  mimeType?: string;
  height?: number | null;
  width?: number | null;
  publicId?: string | null;
  uploadedById?: string | null;
}

export interface MediaGridProps {
  media?: MediaItem[];
  items?: MediaItem[];
  onDelete?: (id: string) => void;
  onBulkDelete?: (ids: string[]) => void;
}

export default function MediaGrid({
  media,
  items,
  onDelete,
  onBulkDelete,
}: MediaGridProps) {
  // Support both `media` and `items` props seamlessly
  const rawList = media || items || [];

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  // Safe items filter (removes any undefined/null entries)
  const safeItems = rawList.filter(
    (item): item is MediaItem => Boolean(item && item.id)
  );

  // Toggle single item selection
  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Select / Deselect All
  const handleSelectAll = () => {
    if (selectedIds.length === safeItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(safeItems.map((item) => item.id));
    }
  };

  // Find the full item object to pass to DeleteMediaDialog
  const itemToDelete = safeItems.find((item) => item.id === deleteItemId) || null;

  return (
    <div className="space-y-4">
      {/* Bulk Actions Header */}
      {selectedIds.length > 0 && (
        <BulkMediaActions
          {...({
            selectedCount: selectedIds.length,
            totalCount: safeItems.length,
            onSelectAll: handleSelectAll,
            onClearSelection: () => setSelectedIds([]),
            onDeleteSelected: () => {
              if (onBulkDelete) {
                onBulkDelete(selectedIds);
                setSelectedIds([]);
              }
            },
          } as any)}
        />
      )}

      {/* Grid Container */}
      {safeItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {safeItems.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              isSelected={selectedIds.includes(item.id)}
              onSelect={handleSelect}
              onPreview={(targetItem) => setPreviewItem(targetItem)}
              onDelete={(id) => setDeleteItemId(id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-12">
          <p className="text-sm text-gray-500">No media files available.</p>
        </div>
      )}

      {/* Preview Dialog */}
      {previewItem && (
        <MediaPreviewDialog
          {...({
            media: previewItem,
            item: previewItem,
            open: !!previewItem,
            onClose: () => setPreviewItem(null),
          } as any)}
        />
      )}

      {/* Delete Single Item Dialog */}
      {deleteItemId && (
        <DeleteMediaDialog
          open={!!deleteItemId}
          media={itemToDelete}
          onClose={() => {
            if (onDelete && deleteItemId) {
              onDelete(deleteItemId);
            }
            setDeleteItemId(null);
          }}
        />
      )}
    </div>
  );
}