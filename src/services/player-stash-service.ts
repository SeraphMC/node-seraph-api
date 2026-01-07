import { SeraphAuthService } from "./auth-service.js";
import type { UUID } from "node:crypto";
import type { PlayerPing, SeraphSearchResponse } from "../models";

export class PlayerStashService {

	private readonly baseURL = "https://stash.seraph.si";

	constructor(private authService: SeraphAuthService) {
	}

	/**
	 * Fetches a list of players based on the provided query.
	 * @param {string} query Query to search for players.
	 * @returns {Promise<SeraphSearchResponse[]>} A list of players that match the query.
	 */
	public fetchSeraphSearch = async (query: string) => {
		try {
			const response = await fetch(`${this.baseURL}/search`, {
				method: "POST",
				body: JSON.stringify({ query }),
				headers: {
					"Content-Type": "application/json",
					Authorization: await this.authService.getSeraphToken(true),
				},
			});
			if (!response.ok) return [];

			const data = (await response.json()) as SeraphSearchResponse[];
			if (data == null) {
				return [];
			}

			return data;
		} catch {
			return [];
		}
	};

	/**
	 * Fetches the ping history of a player.
	 * @param {UUID} playerId UUID of the player.
	 * @returns {Promise<PlayerPing> | null} Ping history of the player.
	 */
	public fetchSeraphPing = async (playerId: UUID) => {
		try {
			const response = await fetch(`${this.baseURL}/ping/${playerId}`, {
				headers: {
					Authorization: await this.authService.getSeraphToken(true),
				},
			});

			if (response.ok) {
				const { data } = (await response.json()) as PlayerPing;
				return data;
			}

			return null;
		} catch (e) {
			return null;
		}
	};

}
