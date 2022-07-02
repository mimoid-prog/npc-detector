export interface Engine {
  npcs: {
    check: () => EngineNpcsCheckReturn;
  };
  map: Map;
}

type EngineNpcsCheckReturn = {
  [key: string]: Npc;
};

export interface Npc {
  d: {
    nick: string;
  };
}

export interface Map {
  d: {
    name: string;
  };
}
