"use client";
import { useEffect, useState } from "react";
import api from "@/app/services/api";
import { Offer } from "../models/offers";

export const useOffers = () => {
  const [offers, setOffers] = useState<Offer[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await api.get("/offer");
        setOffers(response?.data?.offers);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return { offers, loading, error };
};
