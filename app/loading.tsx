import { ReadingSkeleton } from "@/components/skeletons/reading-skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen cinematic-bg p-4 pt-24">
      <div className="mx-auto max-w-md">
        <ReadingSkeleton />
      </div>
    </div>
  );
}
