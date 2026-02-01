import type { SeraphAuthService } from "./auth-service.js";
import type { LeaderboardRegistry, LeaderboardResponse, StatsApiKeys } from "../leaderboard-models.js";

export class LeaderboardService {

	constructor(private seraphAuthService: SeraphAuthService) {}

	public fetchLeaderboard = async <P extends keyof LeaderboardRegistry>(options: { leaderboardPath: P; leaderboardColumn: StatsApiKeys<P>; page?: number; pageSize?: number }) => {
		try {
			const lbUrl = new URL(`https://api.sussy.bot/v1/leaderboards${options.leaderboardPath}`);
			if (options.leaderboardColumn) lbUrl.searchParams.set("sortBy", options.leaderboardColumn.toString());
			if (options.page) lbUrl.searchParams.set("page", options.page.toString());
			if (options.pageSize) lbUrl.searchParams.set("pageSize", options.pageSize.toString());

			const response = await fetch(lbUrl.toString(), {
				headers: {
					"Content-Type": "application/json",
					Authorization: await this.seraphAuthService.getSeraphToken(true),
				},
			});
			if (!response.ok) return { leaderboards: [], totalPlayers: 0 };

			const res = (await response.json()) as LeaderboardResponse<P>;
			const leaderboards = res.leaderboards;

			return { leaderboards, totalPlayers: res.total } as const;
		} catch (e) {
			return { leaderboards: [], totalPlayers: 0 };
		}
	};
}
