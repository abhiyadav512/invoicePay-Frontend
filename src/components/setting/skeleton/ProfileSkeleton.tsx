import { Skeleton } from "../../ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="space-y-6 px-4">
      <div className="space-y-4">
        <Skeleton className="h-6 w-[200px]" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>

        <Skeleton className="h-10 w-[150px] mt-6" />
      </div>
    </div>
  );
}
