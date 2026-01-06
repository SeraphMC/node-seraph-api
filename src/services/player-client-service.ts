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


export class PlayerClientService {

	constructor(private authService: SeraphAuthService) {
	}

	public fetchClient = async (playerId: UUID | string) => {
		try {
			const response = await fetch(`https://client.seraph.si/client/${playerId}`, {
				headers: {
					Authorization: await this.authService.getSeraphToken(true),
				},
			});

			if (!response.ok) {
				return null;
			}

			return (await response.json()) as {
				clientId: string;
				client: ClientType;
				data: PlayerLunarClientDataModel | PlayerBadlionClientDataModel | PlayerEssentialClientDataModel | PlayerFeatherClientDataModel | PlayerLabymodClientDataModel;
			}[];
		} catch (error) {
			return null;
		}
	};

	public fetchClientCosmetics = async (playerId: UUID | string) => {
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
				lunar: PlayerLunarClientAssets[];
				badlion: PlayerBadlionClientAssets[];
			};
		} catch (error) {
			return null;
		}
	};

}
