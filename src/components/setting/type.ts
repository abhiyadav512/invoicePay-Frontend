export type BusinessData = {
  email: string;
  name: string;
  number: string;
  address: string | null;
  taxId: string;
  city: string;
  state: string;
  website: string;
  timezone?: string;
  logo?: string | null;
  description?: string;
  country: string;
  postalCode: string;
  businessType: string;
};

export type UserProfile = {
  id?: string;
  email: string;
  name: string;
  number: string;
  location: string;
  dob: Date;
  createdAt?: string;
  updatedAt?: string;
};

export type User = UserProfile & {
  id: string;
};
