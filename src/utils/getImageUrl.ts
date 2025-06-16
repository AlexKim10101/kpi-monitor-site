import { USE_MOCK, MOCK_URL } from "@consts/consts";
import { URL_ADDRESS } from "@consts/paths";

export const getImageUrl = (endpoint: string) => {
	if (!endpoint) {
		return "";
	}
	const base = USE_MOCK ? MOCK_URL : URL_ADDRESS;
	const cleanBase = base.replace(/\/+$/, "");
	const cleanEndpoint = endpoint.replace(/^\/+/, "");
	return `${cleanBase}/${cleanEndpoint}`;
};
