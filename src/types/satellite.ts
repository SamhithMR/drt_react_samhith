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
}

