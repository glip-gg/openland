import Dexie, { Table } from 'dexie';

export interface ApeDeed {
    id?: number;
    category: string;
    sediment: string;
    sedimentTier: number;
    environment: string;
    environmentTier: number;
    westernResource: string;
    westernResourceTier: number;
    northerResource: string;
    northerResourceTier: number;
    southernResource: string;
    southernResourceTier: number;
    artifact: string;    
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  apeDeeds!: Table<ApeDeed>; 

  constructor() {
    super('amazingDatabase');
    this.version(1).stores({
      apeDeeds: `++id, category, sediment, sedimentTier, environment, environmentTier, westernResource, westernResourceTier, northernResource, northernResourceTier, southernResouce, southernResouceTier, artifact` // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
