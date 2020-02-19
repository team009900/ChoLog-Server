import PlantDataImg from "../../entity/PlantDataImg";

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

  interface diaryType {
    image?: string;
    note?: string;
    degree?: number;
    weatherName?: string;
    humidity?: number;
    finedust?: number;
    createdAt: Date;
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
