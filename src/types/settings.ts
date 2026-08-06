export interface RestaurantSettings {
  id: number;
  restaurantName: string;
  address: string;
  phone: string;
  email: string;
  taxNumber: string;
  currency: string;
  logoUrl: string;
}

export interface UpdateRestaurantSettingsRequest {
  restaurantName: string;
  address: string;
  phone: string;
  email: string;
  taxNumber: string;
  currency: string;
  logoUrl: string;
}