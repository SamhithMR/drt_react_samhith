import axios from 'axios';
import { FilterParams, SatelliteResponse } from '../types/satellite';

const API_BASE_URL = 'https://backend.digantara.dev/v1';

export const fetchSatellites = async (filters: FilterParams) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.objectTypes?.length) {
      params.append('objectTypes', filters.objectTypes.join(','));
    }
    
    if (filters.attributes?.length) {
      params.append('attributes', filters.attributes.join(','));
    }
    
    const response = await axios.get<SatelliteResponse>(
      `${API_BASE_URL}/satellites`,
      { params }
    );
    
    return response.data;
  } catch (error) {
    throw error;
  }
};
