export const API_URL = "http://85.192.20.139:1338/api";

export async function fetchFromApi<T>(
	endpoint: string,
	options?: RequestInit
): Promise<T> {
	const res = await fetch(`${API_URL}${endpoint}`, {
		headers: { "Content-Type": "application/json" },
		...options,
	});

	if (!res.ok) {
		throw new Error(`API error: ${res.status}`);
	}

	const json = await res.json();

	return json.data;
}
