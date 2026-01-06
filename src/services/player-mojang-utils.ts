import type { UUID } from "node:crypto";
import type { MojangPlayer } from "../models.js";

export class MojangUtils {

	private readonly baseURL = "https://stash.seraph.si";

	constructor() {
	}

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
