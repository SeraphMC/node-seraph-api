import type { UUID } from "crypto";

export type Nullable<T> = { [P in keyof T]: T[P] | null; };

export type ClientType = "LABYMOD" | "ESSENTIAL" | "BADLION" | "FEATHER" | "LUNAR" | "NONE";

export type SeraphTokenType = "SERAPH" | "DEVELOPER"

export type PlayerClientDataModel = {
	uuid?: UUID;
	online?: boolean;
	status?: "ONLINE" | "OFFLINE";
};

export type PlayerLunarClientAssets = {
	uuid_player?: UUID;
	cosmetic_id?: number;
	cosmetic_name?: string;
	cosmetic_url?: string;
};

export type PlayerLunarClientDataModel = {
	cosmetics: {
		activeCosmetics: {
			cosmeticId: number;
			metadata: Record<string, unknown>;
		} & PlayerLunarClientAssets[];
	};
} & PlayerClientDataModel;

export type PlayerEssentialClientAssets = {
	player_uuid?: UUID;
	cosmetic_type?: string;
	cosmetic_name?: string;
};

export type PlayerEssentialClientDataModel = {
	cached_at: string;
	cosmetics: PlayerEssentialClientAssets[];
} & PlayerClientDataModel;

export type PlayerLabymodClientDataModel = {
	cosmetics: string[];
} & PlayerClientDataModel;

export type PlayerFeatherClientDataModel = {
	cosmetics: {
		active?: string[];
	};
} & PlayerClientDataModel;

export type PlayerBadlionClientAssets = {
	uuid_player?: UUID;
	cosmetic_id?: number;
	cosmetic_name?: string;
	type: string;
};

export type PlayerBadlionClientDataModel = {
	cosmetics: PlayerBadlionClientAssets[];
} & PlayerClientDataModel;

// Implement your own typing for Hypixel player
export type PlayerCachePlayerHistoryEntry<Player = {}> = {
	data: Partial<Player>;
	last_fetched_at: string;
} & PlayerCachePlayerHistoryTimestamps;

export type PlayerCachePlayerHistoryTimestamps = { cached_at: string; uuid: UUID };

export type PlayerCachePlayerHistory = {
	history: PlayerCachePlayerHistoryEntry[];
};

export type MojangPlayer = { id: UUID; name: string };
