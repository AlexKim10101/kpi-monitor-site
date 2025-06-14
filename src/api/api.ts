import { URL_ADDRESS } from "@consts/paths";

export async function fetchFromApi<T>(
	endpoint: string,
	options?: RequestInit,
	mockData?: T
): Promise<T> {
	if (mockData) {
		return Promise.resolve(mockData);
	}

	const res = await fetch(`${URL_ADDRESS}/api${endpoint}`, {
		headers: { "Content-Type": "application/json" },
		...options,
	});

	if (!res.ok) {
		throw new Error(`API error: ${res.status}`);
	}

	const json = await res.json();

	if (json.data) {
		return json.data;
	}

	return json;
}
