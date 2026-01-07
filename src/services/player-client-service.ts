import { SeraphAuthService } from "./auth-service.js";
import type { UUID } from "node:crypto";
import type {
	ClientType,
	PlayerBadlionClientAssets,
	PlayerBadlionClientDataModel,
	PlayerEssentialClientAssets,
	PlayerEssentialClientDataModel,
	PlayerFeatherClientDataModel,
	PlayerLabymodClientDataModel,
	PlayerLunarClientAssets,
	PlayerLunarClientDataModel,
} from "../models.js";
import { type } from "node:os";

type CommonClient = {
	/**
	 * Internal client ID.
	 * Prefer the 'client' property to accurately identify if the player is on a client.
	 */
	clientId: ClientType
};

type LunarClientModel = {
	/** * @deprecated Please use 'LUNAR_CLIENT'.
	 * 'LUNAR' is being phased out as it breaks Lunar Client's naming convention rules
	 * Support for 'LUNAR' will be removed in the next major release
	 */
	client: "LUNAR" | "LUNAR_CLIENT";
	data: PlayerLunarClientDataModel;
}

type BadlionClientModel = {
	client: "BADLION";
	data: PlayerBadlionClientDataModel;
}

type EssentialClientModel = {
	client: "ESSENTIAL";
	data: PlayerEssentialClientDataModel;
}

type FeatherClientModel = {
	client: "FEATHER";
	data: PlayerFeatherClientDataModel;
}

type LabymodClientModel = {
	client: "LABYMOD";
	data: PlayerLabymodClientDataModel;
}

type NoneClientModel = {
	client: "NONE";
	data: null;
}

type ClientModel =
	CommonClient
	& (LunarClientModel | BadlionClientModel | EssentialClientModel | FeatherClientModel | LabymodClientModel | NoneClientModel);

export class PlayerClientService {

	constructor(private authService: SeraphAuthService) {
	}

	/**
	 * Fetches the client data of a player.
	 * @param {UUID} playerId UUID of the player.
	 * @returns {Promise<ClientModel[]null>} Client data of the player.
	 */
	public fetchClient = async (playerId: UUID) => {
		try {
			const response = await fetch(`https://client.seraph.si/client/${playerId}`, {
				headers: {
					Authorization: await this.authService.getSeraphToken(true),
				},
			});

			if (!response.ok) {
				return null;
			}

			return (await response.json()) as ClientModel[];
		} catch (error) {
			return null;
		}
	};

	/**
	 * Fetches the client cosmetics of a player.
	 * @param {UUID} playerId UUID of the player.
	 * @returns {Promise<{essential: PlayerEssentialClientAssets[], lunar_client: PlayerLunarClientAssets[], badlion_client: PlayerBadlionClientAssets[]}>} Client cosmetics of the player.
	 */
	public fetchClientCosmetics = async (playerId: UUID) => {
		try {
			const response = await fetch(`https://client.seraph.si/cosmetics/${playerId}`, {
				headers: {
					Authorization: await this.authService.getSeraphToken(true),
				},
			});
			if (!response.ok) {
				return null;
			}

			return (await response.json()) as {
				essential: PlayerEssentialClientAssets[];
				lunar_client: PlayerLunarClientAssets[];
				badlion_client: PlayerBadlionClientAssets[];
			};
		} catch (error) {
			return null;
		}
	};

}
