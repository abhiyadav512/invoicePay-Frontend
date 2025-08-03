import React, { useState } from "react";
import { Mail, User, Phone, Save, X, CalendarIcon, MapPin } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import type { UserProfile } from "./type";
import { useGetProfile, useUpdateProfile } from "../../apis/auth/useAuth";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ProfileSkeleton } from "./skeleton/ProfileSkeleton";
import ProfileDetails from "./ProfileDetails";
import type { AuthResponseProfile } from "../../apis/auth/authType";
import { toast } from "sonner";
import { CITIES } from "../../constants/formOption";

const ProfileTab = () => {
  const {
    data,
    isPending: isLoading,
    error,
    isError,
    refetch,
  } = useGetProfile();
  const res = data as AuthResponseProfile;
  const userData = res?.data;

  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useUpdateProfile();

  const [formData, setFormData] = useState<UserProfile>({
    email: "",
    name: "",
    number: "",
    location: "",
    dob: new Date(),
  });

  const [isEditing, setIsEditing] = useState(false);

  const parseDate = (dateValue: any): Date => {
    if (!dateValue) return new Date();
    if (dateValue instanceof Date) return dateValue;
    if (typeof dateValue === "string") {
      const parsed = new Date(dateValue);
      return isNaN(parsed.getTime()) ? new Date() : parsed;
    }
    return new Date();
  };

  const formatDateForAPI = (date: any): string => {
    if (!date) return "";

    let dateObj: Date;
    if (date instanceof Date) {
      dateObj = date;
    } else if (typeof date === "string") {
      dateObj = new Date(date);
    } else {
      return "";
    }

    return isNaN(dateObj.getTime()) ? "" : dateObj.toISOString();
  };

  React.useEffect(() => {
    console.log("UserData updated:", userData);
    if (userData) {
      setFormData({
        ...userData,
        dob: parseDate(userData.dob), 
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing && userData) {
      setFormData({
        ...userData,
        dob: parseDate(userData.dob),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Full name is required.");
      return;
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(formData.number)) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    // Date of Birth Validation
    if (!formData.dob || formData.dob > new Date()) {
      toast.error("Please select a valid birth date.");
      return;
    }

    // Location Validation
    if (!formData.location) {
      toast.error("Please select your city.");
      return;
    }

    try {
      await updateProfile({
        ...formData,
        dob: formatDateForAPI(formData.dob), 
      });

      toast.success("Profile updated successfully!");

      await refetch();

      setIsEditing(false);
    } catch (error) {
      // console.error("Profile update error:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="bg-sidebar space-y-6 border rounded-xl">
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
            <div className="p-2 rounded-lg">
              <User />
            </div>
            Profile Information
          </CardTitle>
          <p className="text-muted-foreground text-sm sm:text-base">
            Update your personal profile and contact information
          </p>
          {isError && (
            <span className="text-red-500 text-sm mt-2 block">
              {error?.message || "Failed to load profile."}
            </span>
          )}
        </CardHeader>

        {isLoading ? (
          <ProfileSkeleton />
        ) : !isEditing ? (
          userData ? (
            <ProfileDetails userData={userData} onEdit={handleEditToggle} />
          ) : null
        ) : (
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h4 className="text-lg font-semibold">
                    Personal Information
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10 h-11"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="name">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10 h-11"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="number">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="number"
                        name="number"
                        type="tel"
                        placeholder="XXXXX XXXXX"
                        className="pl-10 h-11"
                        value={formData.number}
                        onChange={handleChange}
                        required
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="dob">
                      Date of Birth <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className={`w-full justify-start text-left font-normal h-11 pl-10 ${
                            !formData?.dob && "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          {formData.dob ? (
                            format(formData.dob, "PPP")
                          ) : (
                            <span>Select date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          required
                          selected={formData.dob}
                          onSelect={(date) =>
                            setFormData((prev) => ({
                              ...prev,
                              dob: date ?? prev.dob,
                            }))
                          }
                          disabled={(date) => date > new Date()}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground z-10" />
                      <Select
                        value={formData.location}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            location: value,
                          }))
                        }
                      >
                        <SelectTrigger id="city" className="pl-10 h-11">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {CITIES.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <div className="flex gap-4">
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Updating Profile...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleEditToggle}
                    disabled={isUpdating}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ProfileTab;
