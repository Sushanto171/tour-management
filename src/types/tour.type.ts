export interface ITourPackage {
  _id: string;
  title: string;
  slug: string;
  division: string;
  tourType: string;
  description: string;
  images: string[];
  location: string;
  costFrom: number;
  startDate: Date;
  endDate: Date;
  included: string[];
  excluded: string[];
  amenities: string[];
  tourPlan: string[];
  maxGuest: number;
  minAge: number;
  departureLocation: string;
  arrivalLocation: string;
}
