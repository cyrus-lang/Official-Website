import { ReactNode } from "react";

export type HomeFeatureType = {
  icon: ReactNode;
  title: string;
  desc: string;
  details?: string[];
};
export interface HomeCommunityType extends HomeFeatureType {
  link: string;
  button: string;
}
export type HomeStepType = {
  number: number;
  title: string;
  desc: string;
};
