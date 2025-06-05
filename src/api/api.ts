import { BASE_URL } from "../consts/consts";

export async function fetchFromApi<T>(
	endpoint: string,
	options?: RequestInit
): Promise<T> {
	const res = await fetch(`${BASE_URL}/api${endpoint}`, {
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
