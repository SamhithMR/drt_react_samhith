import { useState, useEffect } from "react";
import { fetchSatellites } from "../utils/api";
import { FilterParams, Satellite, SatelliteResponse } from "../types/satellite";

export const useSatellites = (initialFilters: FilterParams = {}) => {
  const [filters, setFilters] = useState<FilterParams>(initialFilters);
  const [data, setData] = useState<Satellite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSatellitesData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("feching data");
        const response = await fetchSatellites(filters);
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSatellitesData();
  }, [filters]);

  return {
    data,
    loading,
    error,
  };
};
