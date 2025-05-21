import { useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "./api";
import { Solution, Client, KeyFunction, News } from "./interfaces";

export function useClients() {
	return useQuery<Client[]>({
		queryKey: ["clients"],
		queryFn: () => fetchFromApi("/clients?populate=logo"),
	});
}

export function useSolutions() {
	return useQuery<Solution[]>({
		queryKey: ["solutions"],
		queryFn: () => fetchFromApi("/solutions?populate=picture"),
	});
}

export function useKeyFunctoins() {
	return useQuery<KeyFunction[]>({
		queryKey: ["features"],
		queryFn: () => fetchFromApi("/features?populate=icon"),
	});
}

export function useNews() {
	return useQuery<News[]>({
		queryKey: ["news"],
		queryFn: () => fetchFromApi("/news"),
	});
}
