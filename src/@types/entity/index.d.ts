import PlantDataImg from "../../entity/PlantDataImg";
import State from "../../entity/State";
import { Weather } from "../../entity";

declare namespace entity {
  interface userUpdateType {
    username?: string;
    image?: string;
    password?: string;
    commentAllow?: number;
    open?: number;
  }

  interface plantsDatabaseType {
    distributionName: string;
    scientificName?: string;
    englishName?: string;
    contentsNo: number;
    images?: PlantDataImg[];
    tmpImages?: string[];
  }

  interface apiType {
    provider: string;
    url: string;
  }

  interface stateType {
    id: number;
    level: number;
  }

  interface diaryType {
    image?: string;
    note?: string;
    temperature?: number;
    humidity?: number;
    finedust?: number;
    createdAt: Date;
    weather?: Weather;
    states?: State[];
  }

  interface diaryUpdateType {
    image?: string;
    note?: string;
    temperature?: number;
    humidity?: number;
    finedust?: number;
    createdAt?: Date;
    weather?: Weather;
    states?: State[];
  }

  interface plantUpdateType {
    image?: string;
    nickname?: string;
    plantName?: string;
    scientificName?: string;
    adoptionDate?: Date;
    deathDate?: Date;
    memo?: string;
    advice?: string;
    openAllow?: number;
  }
}

export = entity;
