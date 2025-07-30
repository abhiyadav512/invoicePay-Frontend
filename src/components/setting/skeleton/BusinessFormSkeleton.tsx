import { Card, CardContent } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";

export const BusinessFormSkeleton = () => {
  return (
    <div className=" p-4 space-y-6">
      <Card className="p-6 space-y-4">
        <CardContent className="space-y-6">
          <Skeleton className="h-6 w-1/3" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>

          <Skeleton className="h-10 w-32" />
        </CardContent>
      </Card>
    </div>
  );
};
