export interface Merchant {
  id: number;
  image: string;
  name: string;
}

export interface Offer {
  id: number;
  eligibleDays: string[];
  title: string;
  images: string[];
  validFrom: Date;
  timezone: string;
  merchant: Merchant;
  description: string;
}

export interface DataContextType {
  offers: Offer[] | null;
  setOffers: (data: Offer[]) => void;
}
