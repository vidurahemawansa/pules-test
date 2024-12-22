"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Offer } from "@/app/models/offers"; // Assuming you have an Offer type

interface OffersContextType {
  offers: Offer[] | null;
  setOffers: (data: Offer[]) => void;
}

const OffersContext = createContext<OffersContextType | undefined>(undefined);

export const OffersProvider = ({ children }: { children: ReactNode }) => {
  const [offers, setOffers] = useState<Offer[] | null>(null);

  return (
    <OffersContext.Provider value={{ offers, setOffers }}>
      {children}
    </OffersContext.Provider>
  );
};

export const useOffersContext = () => {
  const context = useContext(OffersContext);
  if (!context) {
    throw new Error("useOffersContext must be used within an OffersProvider");
  }
  return context;
};
