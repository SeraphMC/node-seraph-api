# Seraph API Client

This repository contains the client library for interacting with the Seraph API. It provides a convenient way to access various Seraph services, including player data, authentication, and linking functionalities.

## Installation

To add the lib, use [Bun](https://bun.sh):

```bash
bun add @seraphmc/node-seraph-api
```

## Usage
### Initialising the API Client

To use the Seraph API, you need to instantiate `SeraphAPI` with your client refresh token. This token is crucial for authentication with the Seraph services.

```typescript
import { SeraphAPI } from "./seraph-api.ts";

const clientRefreshToken = process.env.SERAPH_CLIENT_REFRESH_TOKEN;

if (!clientRefreshToken) {
    throw new Error("Seraph refresh token is required.");
}

const seraph = new SeraphAPI(clientRefreshToken);
```

### Available Services

The `SeraphAPI` instance provides access to several services, each handling specific functionalities:

#### `getPlayerMojangService`

Handles fetching Mojang player data (UUID and username).

```typescript
const mojangService = seraph.getPlayerMojangService;
const player = await mojangService.fetchMojang("Notch");
console.log(player); // { id: "069a79f4-44e9-4726-a5be-fca90e38aaf5", name: "Notch" }
```

#### `getAuthService`

Manages authentication with the Seraph API, including fetching and refreshing access tokens.

```typescript
const authService = seraph.getAuthService;
const token = await authService.getSeraphToken(true); // Get token with "Bearer" prefix
console.log(token); // Bearer <your_access_token>
```

#### `getPlayerClientService`

Provides methods to fetch player client information (e.g., Lunar Client, Badlion Client) and cosmetics.

```typescript
const clientService = seraph.getPlayerClientService;
const clients = await clientService.fetchClient("PLAYER_UUID");
console.log(clients);

const cosmetics = await clientService.fetchClientCosmetics("PLAYER_UUID");
console.log(cosmetics);
```

#### `getPlayerCacheService`

Allows fetching historical player data and changes from the player cache.

```typescript
const cacheService = seraph.getPlayerCacheService;

const playerHistory = await cacheService.fetchPlayerHistory("PLAYER_UUID");
console.log(playerHistory);

const playerChanges = await cacheService.fetchPlayerChanges("PLAYER_UUID");
console.log(playerChanges);
```

#### `getPlayerStashService`

Provides access to player stash functionalities, including search and ping data.

```typescript
const stashService = seraph.getPlayerStashService;

const searchResults = await stashService.fetchSeraphSearch("some_query");
console.log(searchResults);

const seraphPing = await stashService.fetchSeraphPing("PLAYER_UUID");
console.log(seraphPing);
```

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.
