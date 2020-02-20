import PlantDataImg from "../../entity/PlantDataImg";
import State from "../../entity/State";

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
    weatherName?: string;
    humidity?: number;
    finedust?: number;
    createdAt: Date;
    state?: stateType[];
    weatherId?: number;
    states?: State[];
  }

  interface diaryUpdateType {
    image?: string;
    note?: string;
    temperature?: number;
    weatherName?: string;
    humidity?: number;
    finedust?: number;
    createdAt?: Date;
    state?: stateType[];
    weatherId?: number;
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
