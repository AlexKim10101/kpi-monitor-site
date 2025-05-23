import { useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "./api";
import {
	Navigation,
	Caption,
	Solution,
	Client,
	KeyFunction,
	News,
	Operation,
	Stage,
} from "./interfaces";

export function useNavigation() {
	return useQuery<Navigation[]>({
		queryKey: ["navigation"],
		queryFn: () => fetchFromApi("/navigations?populate=parent"),
	});
}

export function useCaptions() {
	return useQuery<Caption[]>({
		queryKey: ["caption"],
		queryFn: () => fetchFromApi("/captions?locale=ru"),
	});
}

// export function useCaptions() {
// 	const { language } = useLanguage();

// 	return useQuery<Caption[]>({
// 		queryKey: ["captions", language],
// 		queryFn: () => fetchFromApi(`/captions?locale=${language}`),
// 	});
// }

export function useButtons() {
	return useQuery<Caption[]>({
		queryKey: ["button"],
		queryFn: () => fetchFromApi("/buttons"),
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
				"/function-types?populate[functions][populate][function_blocks]=true&populate[functions]=true&populate=true"
			),
	});
}

export function useStages() {
	return useQuery<Stage[]>({
		queryKey: ["stages"],
		queryFn: () => fetchFromApi("/applications?populate=icon"),
	});
}
