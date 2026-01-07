import type { UUID } from "node:crypto";
import type { MojangPlayer } from "../models.js";

export class MojangUtils {

	private readonly baseURL = "https://stash.seraph.si";

	constructor() {
	}

	/**
	 * Fetches a Mojang player from their name or UUID.
	 * @param {string | UUID} nameOrId Name or UUID of the player.
	 * @returns {Promise<MojangPlayer | null>} A promise that resolves to the Mojang player data.
	 */
	public fetchMojang = async (nameOrId: string | UUID) => {
		try {
			const response = await fetch(`${this.baseURL}/mojang/${nameOrId}`);
			if (!response.ok) return null;

			const { id, name } = (await response.json()) as MojangPlayer;
			return { id, name };
		} catch {
			return null;
		}
	};

}
