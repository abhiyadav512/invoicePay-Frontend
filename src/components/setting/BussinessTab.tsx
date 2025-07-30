import React, { useState, useEffect } from "react";
import {
  Building2,
  Mail,
  Phone,
  Save,
  X,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { BusinessData } from "./type";
import {
  useGetBusiness,
  useSetupBusiness,
  useUpdateBusinessInfo,
} from "../../apis/business/useBusiness";
import { BusinessFormSkeleton } from "./skeleton/BusinessFormSkeleton";
import BusinessDetails from "./BussinessDetails";

const BusinessTab = () => {
  const {
    data: BusinessProfileData,
    isPending: isLoading,
    error: fetchError,
    isError: isFetchError,
  } = useGetBusiness();

  const { mutateAsync, isPending: isMutating } = useSetupBusiness();

  const { mutate: updateBusinessInfo, isPending: isPendingUpdate } =
    useUpdateBusinessInfo();

  const isProcessing = isMutating || isPendingUpdate;
  const businessData = BusinessProfileData?.data;

  const STATES = [
    "Maharashtra",
    "Delhi",
    "Karnataka",
    "Tamil Nadu",
    "Gujarat",
    "Rajasthan",
  ];
  const CITIES = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Ahmedabad",
    "Jaipur",
  ];
  const COUNTRIES = ["India", "USA", "UK", "Canada", "Germany"];
  const BUSINESS_TYPES = [
    "Retail",
    "Service",
    "Manufacturing",
    "Software",
    "Other",
  ];

  const [formData, setFormData] = useState<BusinessData>({
    email: "",
    name: "",
    number: "",
    address: "",
    taxId: "",
    city: "",
    state: "",
    website: "",
    postalCode: "",
    logo: "",
    businessType: "",
    description: "",
    country: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (businessData) {
      setFormData(businessData);
    }
  }, [businessData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setFormData(businessData);
    }
  };

  const handleSubmit = () => {
    if (businessData) {
      updateBusinessInfo(formData);
      setIsEditing(false);
    } else {
      mutateAsync(formData);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-sidebar space-y-6 border rounded-xl">
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
            <div className="p-2 rounded-lg">
              <Building2 />
            </div>
            Business Information
          </CardTitle>
          <p className="text-muted-foreground text-sm sm:text-base">
            Update your business profile and contact information
          </p>
          {isFetchError && (
            <span className="text-red-500 text-sm mt-2 block">
              {fetchError?.response?.data?.message ||
                "Failed to load business profile."}
            </span>
          )}
        </CardHeader>

        {isLoading ? (
          <BusinessFormSkeleton />
        ) : !isEditing ? (
          <BusinessDetails
            businessData={businessData}
            onEdit={handleEditToggle}
          />
        ) : (
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h4 className="text-lg font-semibold">
                    Personal Information
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative mt-1">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        className="pl-10 h-11"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="number">Phone Number</Label>
                    <div className="relative mt-1">
                      <Input
                        id="number"
                        name="number"
                        type="tel"
                        className="pl-10 h-11"
                        value={formData.number}
                        onChange={handleChange}
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h4 className="text-lg font-semibold">Business Details</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Company Name</Label>
                    <Input
                      id="name"
                      name="name"
                      className="h-11"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      className="h-11"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxId">Tax ID</Label>
                    <Input
                      id="taxId"
                      name="taxId"
                      className="h-11"
                      value={formData.taxId}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          businessType: value,
                        }))
                      }
                    >
                      <SelectTrigger id="businessType" className="h-11">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {BUSINESS_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h4 className="text-lg font-semibold">Business Address</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      name="address"
                      className="h-11"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, city: value }))
                      }
                    >
                      <SelectTrigger id="city" className="h-11">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {CITIES.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, state: value }))
                      }
                    >
                      <SelectTrigger id="state" className="h-11">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {STATES.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, country: value }))
                      }
                    >
                      <SelectTrigger id="country" className="h-11">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      className="h-11"
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <div className="flex gap-4">
                  <Button type="submit" disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Updating...
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
                    disabled={isProcessing}
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

export default BusinessTab;
