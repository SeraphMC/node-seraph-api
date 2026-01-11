import type { UUID } from "crypto";
import type { AddReportPayload, SeraphReport, StandardOverlayFormat } from "../models";

// Legacy report types, now cheating tags are more common as targeting is no longer possibe. Prefer cheating types over legacy types.
const reportTypes = [
	{
		seraphName: "sniping",
		cleanName: "Sniping",
		legacy: true
	},
	{
		seraphName: "cheating_blatant",
		cleanName: "Blatant Cheater",
	},
	{
		seraphName: "cheating_closet",
		cleanName: "Closet Cheater",
	},
	{
		seraphName: "sniping_legit",
		cleanName: "Legit Sniper",
		legacy: true
	},
	{
		seraphName: "sniping_potential",
		cleanName: "Possible Sniper",
		legacy: true
	},
	{
		seraphName: "alt",
		cleanName: "Alt",
	},
	{
		seraphName: "annoy_list",
		cleanName: "Annoy List",
		legacy: true
	},
	{
		seraphName: "bot",
		cleanName: "Botting",
		legacy: true
	},
	{
		seraphName: "caution",
		cleanName: "Caution",
	},
] as const;

export class PlayerReportService {
	private readonly baseURL = "https://api.seraph.si";

	constructor(private seraphApiKey: UUID) {
	}

	/**
		Fetches report data for a player. This uses the legacy version of the API. Versioning will be implemented soon with better support for modern applications.
		@param {UUID} playerId UUID of the player.
		@returns {Promise<{status: number, data: SeraphReport | null}>} Promise containing the status and data of the player report.
	 */
	public async fetchPlayerReport(playerId: UUID) {
		const response = await fetch(`${this.baseURL}/blacklist/${playerId}`, {
			headers: {
				"seraph-api-key": this.seraphApiKey,
			},
		})

		if (!response.ok) return { status: response.status, data: null };

		const data = await response.json() as SeraphReport
		return {status: response.status, data: data.data }
	}


	/**
		Fetches report data for a player formatted using a standardised format.
		@param {UUID} playerId UUID of the player.
		@returns {Promise<StandardOverlayFormat>} Promise containing the formatted report data.
	 */
	public async fetchFormattedPlayerReport(playerId: UUID) {
		const response = await fetch(`${this.baseURL}/cubelify/blacklist/${playerId}`, {
			headers: {
				"seraph-api-key": this.seraphApiKey,
			},
		})

		return {status: response.status, data: await response.json() as StandardOverlayFormat }
	}


	/**
	 * Adds a report to a player. Metadata includes the report type, reason, and other relevant information.
	 * @param playerId UUID of the player.
	 * @param metadata Metadata of the report.
	 * @returns {Promise<{status: number}>} Promise containing the status of the report.
	 */
	public async reportPlayer(playerId: UUID, metadata: {
		reportType: typeof reportTypes[number]["seraphName"];
		reason?: string;
	}) {
		if (!reportTypes.some(inputType => inputType.seraphName === metadata.reportType)) {
			throw new Error("Invalid report type");
		}

		const response = await fetch(`${this.baseURL}/report`, {
			headers: {
				"seraph-api-key": this.seraphApiKey,
			},
			body: JSON.stringify({
				uuid: playerId,
				report_type: metadata.reportType,
				reason: metadata.reason,
			} satisfies AddReportPayload),
			method:'POST',
		});

		return { status: response.status };
	}

	/**
	 * Retrieves the list of report types.
	 *
	 * This function returns the available report types which are predefined and used
	 * in the application for categorising or generating specific reports.
	 *
	 * @function
	 * @returns {Array} The list of report types.
	 */
	public getReportTypes = () => reportTypes

}
