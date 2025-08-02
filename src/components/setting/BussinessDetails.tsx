import { Mail, Phone, MapPin, Hash, Globe, Edit } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { CardContent } from "../ui/card";
import type { BusinessData } from "./type";

interface BusinessDetailsProps {
  businessData?: BusinessData;
  onEdit: () => void;
}

const BusinessDetails: React.FC<BusinessDetailsProps> = ({
  businessData,
  onEdit,
}) => {
  const InfoField = ({
    label,
    value,
    icon: Icon,
  }: {
    label: string;
    value: string;
    icon?: React.ElementType;
  }) => (
    <div>
      <Label className="text-sm font-medium text-muted-foreground">
        {label}
      </Label>
      <div className="relative mt-1">
        <div
          className={`flex items-center h-11 px-3 py-2 border border-input  rounded-md ${
            Icon ? "pl-10" : ""
          }`}
        >
          {Icon && (
            <Icon className="absolute left-3 h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-sm">{value || "Not specified"}</span>
        </div>
      </div>
    </div>
  );

  return (
    <CardContent>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Business Profile</h3>
          <Button onClick={onEdit} variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        <div className="space-y-4">
          <div className="border-b pb-2">
            <h4 className="text-lg font-semibold">Personal Information</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField
              label="Email"
              value={businessData?.email ?? ""}
              icon={Mail}
            />
            <InfoField
              label="Phone Number"
              value={businessData?.phone ?? ""}
              icon={Phone}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-b pb-2">
            <h4 className="text-lg font-semibold">Business Details</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField label="Company Name" value={businessData?.name ?? ""} />
            <InfoField
              label="Website"
              value={businessData?.website ?? ""}
              icon={Globe}
            />
            <InfoField
              label="Tax ID"
              value={businessData?.taxId ?? ""}
              icon={Hash}
            />
            <InfoField
              label="Business Type"
              value={businessData?.businessType ?? ""}
            />
          </div>
          {businessData?.description && (
            <div className="md:col-span-2">
              <InfoField
                label="Description"
                value={businessData?.description}
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="border-b pb-2">
            <h4 className="text-lg font-semibold">Business Address</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField
              label="Street Address"
              value={businessData?.address ?? ""}
              icon={MapPin}
            />
            <InfoField label="City" value={businessData?.city ?? ""} />
            <InfoField label="State" value={businessData?.state ?? ""} />
            <InfoField label="Country" value={businessData?.country ?? ""} />
            <div className="md:col-span-2">
              <InfoField
                label="Postal Code"
                value={businessData?.postalCode ?? ""}
              />
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  );
};

export default BusinessDetails;
