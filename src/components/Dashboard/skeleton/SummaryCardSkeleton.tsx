import { Skeleton } from "../../ui/skeleton";

const SummaryCardSkeleton = () => {
  return (
    <div className="border rounded-lg p-4  shadow-sm flex justify-between">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-6 w-6 rounded-full" />
    </div>
  );
};

export default SummaryCardSkeleton;
