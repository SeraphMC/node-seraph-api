import { SeraphAuthService } from "./services/auth-service.js";
import { PlayerCacheService } from "./services/player-cache-service.js";
import { MojangUtils } from "./services/player-mojang-utils.js";
import { PlayerStashService } from "./services/player-stash-service.js";
import { PlayerClientService } from "./services/player-client-service.js";
import { PlayerLinkingService } from "./services/player-linking-service.js";
import type { SeraphTokenType } from "./models.js";

export class SeraphAPI {

	private readonly playerCacheService;
	private readonly authService;
	private readonly playerMojangUtils;
	private readonly playerLinkingService;
	private readonly playerClientService;
	private readonly playerStashService;

	// Constructs new SeraphAPI instance using a client token.
	public constructor(tokenType: SeraphTokenType, clientRefreshToken: string) {
		this.authService = new SeraphAuthService(tokenType, clientRefreshToken);
		this.playerCacheService = new PlayerCacheService(this.authService);
		this.playerMojangUtils = new MojangUtils();
		this.playerStashService = new PlayerStashService(this.authService);
		this.playerClientService = new PlayerClientService(this.authService);
		this.playerLinkingService = new PlayerLinkingService(this.authService);
	}

	public get getPlayerCacheService() {
		return this.playerCacheService;
	}

	public get getPlayerMojangService() {
		return this.playerMojangUtils;
	}

	public get getPlayerStashService() {
		return this.playerStashService;
	}

	public get getPlayerClientService() {
		return this.playerClientService;
	}

	public get getPlayerLinkingService() {
		return this.playerLinkingService;
	}

	public get getAuthService() {
		return this.authService;
	}

}
