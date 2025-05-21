import { useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "./api";
import {
	Caption,
	Solution,
	Client,
	KeyFunction,
	News,
	Operation,
} from "./interfaces";

export function useCaptions() {
	return useQuery<Caption[]>({
		queryKey: ["caption"],
		queryFn: () => fetchFromApi("/captions"),
	});
}

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

export function useOperations() {
	return useQuery<Operation[]>({
		queryKey: ["operations"],
		queryFn: () =>
			fetchFromApi(
				"/functions?populate=function_type&populate=function_blocks"
			),
	});
}
