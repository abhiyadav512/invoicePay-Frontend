import React from "react";
import { Mail, User, Phone, Edit, Calendar1, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { CardContent } from "../ui/card";
import type { UserProfile } from "./type";

interface ProfileDetailsProps {
  userData: UserProfile;
  onEdit: () => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  userData,
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
          <h3 className="text-lg font-semibold">Personal Profile</h3>
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
            <InfoField label="Email" value={userData?.email} icon={Mail} />
            <InfoField label="Full Name" value={userData?.name} icon={User} />
            <div className="md:col-span-2">
              <InfoField
                label="Phone Number"
                value={userData?.number}
                icon={Phone}
              />
            </div>
            <InfoField
              label="Date of Birth"
              value={
                userData?.dob ? new Date(userData.dob).toLocaleDateString() : ""
              }
              icon={Calendar1}
            />
            <InfoField
              label="Location"
              value={userData?.location}
              icon={MapPin}
            />
          </div>
        </div>
      </div>
    </CardContent>
  );
};

export default ProfileDetails;
