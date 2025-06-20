import { Table } from "@tanstack/react-table";

export type ObjectType = 'ROCKET BODY' | 'DEBRIS' | 'UNKNOWN' | 'PAYLOAD';
export type OrbitCode = 'LEO' | 'LEO1' | 'LEO2' | 'LEO3' | 'LEO4' | 'MEO' | 'GEO' | 'HEO' | 'IGO' | 'EGO' | 'NSO' | 'GTO' | 'GHO' | 'HAO' | 'MGO' | 'LMO' | 'UFO' | 'ESO' | 'UNKNOWN';

export interface Satellite {
  noradCatId: string;
  intlDes: string;
  name: string;
  launchDate: string | null;
  decayDate: string | null;
  objectType: ObjectType;
  launchSiteCode: string;
  countryCode: string;
  orbitCode: string;
}

export interface SatelliteResponse {
  data: Satellite[];
  statusCode: number;
  message?: string;
}

export interface FilterParams {
  objectTypes?: ObjectType[];
  attributes?: string[];
  orbitCodes?: OrbitCode[];
}

export interface FiltersProps {
  onFilter: (filters: FilterParams) => void;
}

export interface SatelliteTableProps {
  data: Satellite[];
  loading: boolean;
  error: string | null;
}

export interface SatelliteTableBodyProps {
  table: Table<Satellite>;
  parentRef: React.RefObject<HTMLDivElement | null>;
  selectedRows: Satellite[];
  setSelectedRows: React.Dispatch<React.SetStateAction<Satellite[]>>;
  setSelectionError: React.Dispatch<React.SetStateAction<string>>;
}
