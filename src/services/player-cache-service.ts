import type { UUID } from "node:crypto";
import { SeraphAuthService } from "./auth-service.js";
import { type PlayerCachePlayerHistory, type PlayerCachePlayerHistoryTimestamps } from "../models.js";

export class PlayerCacheService {
	private readonly baseURL = "https://player-cache.seraph.si";

	constructor(private authService: SeraphAuthService) {
	}

	/**
	 * Fetches the player changes of a player.
	 * @param {UUID} playerId UUID of the player.
	 * @returns {Promise<PlayerCachePlayerHistoryEntry<{}>[] | null} Player changes of the player.
	 */
	public fetchPlayerChanges = async (playerId: UUID) => {
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

	/**
	 * Fetches the player timestamps of a player.
	 * @param {UUID} playerId UUID of the player.
	 * @returns {Promise<PlayerCachePlayerHistoryTimestamps[] | null>} Player timestamps of the player.
	 */
	public fetchPlayerTimestamps = async (playerId: UUID) => {
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

	/**
	 * Fetches the history of a player based on the provided player ID.
	 *
	 * @param {UUID} playerId UUID of the player.
	 *
	 * @returns {Promise<PlayerCachePlayerHistory | null>} A promise that resolves to the player's history data
	 */
	public fetchPlayerHistory = async (playerId: UUID) => {
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

	/**
	 * Fetches the history of a player based on the provided player ID and timestamp.
	 * @param {UUID} playerId UUID of the player.
	 * @param {string} timestamp Timestamp to fetch the player history from.
	 * @returns {Promise<PlayerCachePlayerHistory | null>} A promise that resolves to the player's history data
	 */
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
