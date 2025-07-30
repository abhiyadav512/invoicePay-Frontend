import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

export const FilterPopover = ({
  selectedFilter,
  onChange,
}: {
  selectedFilter: string | null;
  onChange: (filter: string | null) => void;
}) => {
  const statuses = ["PAID", "UNPAID", "OVERDUE"];

  const toggleStatus = (status: string) => {
    if (selectedFilter === status) {
      onChange(null); 
    } else {
      onChange(status); 
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          Filter {selectedFilter ? `: ${selectedFilter}` : ""}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 space-y-2 mr-4">
        <p className="text-sm font-semibold mb-2">Filter by status</p>
        {statuses.map((status) => (
          <div
            key={status}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => toggleStatus(status)}
          >
            <Checkbox checked={selectedFilter === status} />
            <span className="capitalize text-sm">{status}</span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
