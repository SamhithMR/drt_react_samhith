import { ObjectType, OrbitCode } from './satellite';

export interface GroupBase<T> {
  options: T[];
}

export type SelectOption = {
  value: string;
  label: string;
} & (
  | { options?: never }
  | (GroupBase<{ value: string; label: string }> & { options: { value: string; label: string }[] })
);

export interface FilterParams {
  objectTypes?: ObjectType[];
  attributes?: string[];
}
