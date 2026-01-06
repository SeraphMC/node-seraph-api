import type { UUID } from "node:crypto";
import { SeraphAuthService } from "./auth-service.js";
import { type PlayerCachePlayerHistory, type PlayerCachePlayerHistoryTimestamps } from "../models.js";

export class PlayerCacheService {
	private readonly baseURL = "https://player-cache.seraph.si";

	constructor(private authService: SeraphAuthService) {
	}

	public fetchPlayerChanges = async (playerId: UUID | string) => {
		try {
			const response = await fetch(`${this.baseURL}/player/changes/${playerId}`, {
				headers: {
					Authorization: await this.authService.getSeraphToken(true),
				},
			});
			if (response.ok) {
				const { history } = (await response.json()) as PlayerCachePlayerHistory;
				return history;
			}

			return null;
		} catch (error) {
			return null;
		}
	};

	public fetchPlayerTimestamps = async (playerId: UUID | string) => {
		try {
			const response = await fetch(`${this.baseURL}/player/timestamps/${playerId}`, {
				headers: {
					Authorization: await this.authService.getSeraphToken(true),
				},
			});
			if (response.ok) {
				const { history } = (await response.json()) as {
					history: PlayerCachePlayerHistoryTimestamps[];
				};
				return history;
			}

			return null;
		} catch (error) {
			return null;
		}
	};

	public fetchPlayerHistory = async (playerId: UUID | string) => {
		try {
			const response = await fetch(`${this.baseURL}/player/${playerId}`, {
				headers: {
					Authorization: await this.authService.getSeraphToken(true),
				},
			});
			if (response.ok) {
				const { history } = (await response.json()) as PlayerCachePlayerHistory;
				return history;
			}

			return null;
		} catch (error) {
			return null;
		}
	};

	public fetchPlayerHistoryByTimestamp = async (playerId: UUID | string, timestamp: string) => {
		try {
			const response = await fetch(`${this.baseURL}/player`, {
				method: "POST",
				body: JSON.stringify({
					timestamp,
					player_uuid: playerId,
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: await this.authService.getSeraphToken(true),
				},
			});
			if (response.ok) {
				const { history } = (await response.json()) as PlayerCachePlayerHistory;
				return history;
			}
			return null;
		} catch (error) {
			return null;
		}
	};
}
