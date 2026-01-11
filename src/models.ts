import type { UUID } from "crypto";

export type Nullable<T> = { [P in keyof T]: T[P] | null; };

export type AddReportPayload = {
	uuid: string;
	report_type?: string;
	reason?: string;
}

export type SeraphReport = {
	success: boolean;
	data: {
		uuid: string;
		key_type?: string;
		member?: {
			tagged: true;
			tooltip?: string;
		} | {
			tagged: false;
		};
		bot?: {
			tagged: true;
			unidentified?: boolean;
			kay?: boolean;
		} | {
			tagged: false;
		};
		blacklist: {
			tagged: false
		};
		safelist: {
			tagged: true;
			timesKilled?: number;
			security_level?: number;
			personal?: boolean;
			added_by?: string;
			tooltip?: string;
			time_added?: number;
			time_updated?: number;
			discord_linked?: string;
		} | {
			tagged: false;
		};
		customTag?: string | null;
		statistics?: {
			encounters?: number;
			threat_level?: number;
		};
		annoylist?: {
			tagged: true;
			tooltip?: string;
		} | {
			tagged: false;
		};
		name_change?: {
			tagged: true;
			last_change?: number;
			changed?: boolean;
			tooltip?: string;
		} | {
			tagged: false;
		};
	} | {
		blacklist: {
			tagged: true;
			timestamp?: Date;
			reason?: string;
			report_type?: string;
			tooltip?: string;
			verified?: boolean;
		}
	};
};

export type StandardOverlayFormat = {
	score?: {
		value: number
		mode?: "add" | "set"
	}

	tags?: {
		icon?: string
		text?: string
		tooltip?: string
		color?: number
		textColor?: number
	}[]
}

export type ClientType = "LABYMOD" | "ESSENTIAL" | "BADLION" | "FEATHER" | ("LUNAR" | "LUNAR_CLIENT") | "NONE";

export type SeraphTokenType = "LEGACY" | "DEVELOPER"

export type SeraphSearchResponse = { name: string; value: string };

export type PlayerPing = {
	data: {
		date: string;
		max: number;
		min: number;
		avg: number;
		history: number[];
		last_ping?: string;
	}[] | null;
}

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
