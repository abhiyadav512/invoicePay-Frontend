export interface BusinessResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    description: string;
    website: string;
    phone: string;
    email: string;
    ownerId: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    businessType: string;
    taxId: string;
    logo: string | null;
    defaultCurrency: string;
    timezone: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface SetupBusinessInput {
  name: string;
  description?: string;
  website?: string;
  phone?: string;
  email: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  businessType?: string;
  taxId?: string;
  logo?: string;
  defaultCurrency?: string; 
  timezone?: string; 
}

export interface UpdateBusinessInput {
  name?: string;
  description?: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  businessType?: string;
  taxId?: string;
  logo?: string;
  defaultCurrency?: string;
  timezone?: string;
}

export interface BusinessStatusResponse {
  success: boolean;
  message: string;
  data: {
    isSetup: boolean;
    isComplete: string; 
    business: {
      id: string;
      name: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      country: string;
    };
    requiredFields: {
      name: boolean;
      email: boolean;
      phone: boolean;
      address: boolean;
      city: boolean;
      country: boolean;
    };
  };
}
