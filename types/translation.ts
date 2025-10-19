import { ReactNode } from "react";

export interface Translation {
  <Key extends string>(key: Key, ...args: any[]): string;
  rich<Key extends string>(key: Key, ...args: any[]): ReactNode;
  markup<Key extends string>(key: Key, ...args: any[]): string;
  raw<Key extends string>(key: Key): any;
  has<Key extends string>(key: Key): boolean;
}

export interface TranslationProps {
  t: Translation;
}
