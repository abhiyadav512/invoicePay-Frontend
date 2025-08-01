import { Skeleton } from "../../ui/skeleton";

const InvoiceCardSkeleton = () => {
  return (
    <div>
      <li className="border p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <div className="flex justify-between items-center mt-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </li>
    </div>
  );
};

export default InvoiceCardSkeleton;
