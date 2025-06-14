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
	Locale,
} from "./interfaces";
import { useLanguage } from "../context/languageContext";
import { USE_MOCK } from "@consts/consts";
import {
	fakeNavigation,
	fakeLocales,
	fakeCaption,
	fakeButtons,
	fakeSolution,
	fakeClient,
	fakeKeyFunction,
	fakeNews,
	fakeOperation,
	fakeStage,
} from "@consts/mockData";

export function useNavigation() {
	const { language } = useLanguage();

	return useQuery<Navigation[]>({
		queryKey: ["navigation", language],
		queryFn: () =>
			fetchFromApi(
				`/navigations?populate=parent&locale=${language}`,
				undefined,
				USE_MOCK ? fakeNavigation : undefined
			),
	});
}

export function useLocales() {
	return useQuery<Locale[]>({
		queryKey: ["locales"],
		queryFn: () =>
			fetchFromApi(
				"/i18n/locales",
				undefined,
				USE_MOCK ? fakeLocales : undefined
			),
		initialData: [],
	});
}

export function useCaptions() {
	const { language } = useLanguage();
	return useQuery<Caption[]>({
		queryKey: ["captions", language],
		queryFn: () =>
			fetchFromApi(
				`/captions?locale=${language}`,
				undefined,
				USE_MOCK ? fakeCaption : undefined
			),
	});
}

export function useButtons() {
	const { language } = useLanguage();
	return useQuery<Caption[]>({
		queryKey: ["button", language],
		queryFn: () =>
			fetchFromApi(
				`/buttons?locale=${language}`,
				undefined,
				USE_MOCK ? fakeButtons : undefined
			),
	});
}

export function useClients() {
	const { language } = useLanguage();
	return useQuery<Client[]>({
		queryKey: ["clients", language],
		queryFn: () =>
			fetchFromApi(
				`/clients?populate=logo&locale=${language}`,
				undefined,
				USE_MOCK ? fakeClient : undefined
			),
	});
}

export function useSolutions() {
	const { language } = useLanguage();

	return useQuery<Solution[]>({
		queryKey: ["solutions", language],
		queryFn: () =>
			fetchFromApi(
				`/solutions?populate=picture&locale=${language}`,
				undefined,
				USE_MOCK ? fakeSolution : undefined
			),
	});
}

export function useKeyFunctoins() {
	const { language } = useLanguage();
	return useQuery<KeyFunction[]>({
		queryKey: ["features", language],
		queryFn: () =>
			fetchFromApi(
				`/features?populate=icon&locale=${language}`,
				undefined,
				USE_MOCK ? fakeKeyFunction : undefined
			),
	});
}

export function useNews() {
	const { language } = useLanguage();

	return useQuery<News[]>({
		queryKey: ["news", language],
		queryFn: () =>
			fetchFromApi(
				`/news?locale=${language}`,
				undefined,
				USE_MOCK ? fakeNews : undefined
			),
	});
}

export function useOperations() {
	const { language } = useLanguage();

	return useQuery<Operation[]>({
		queryKey: ["operations", language],
		queryFn: () =>
			fetchFromApi(
				`/function-types?populate[functions][populate][function_blocks]=true&populate[functions]=true&populate=true&locale=${language}`,
				undefined,
				USE_MOCK ? fakeOperation : undefined
			),
	});
}

export function useStages() {
	const { language } = useLanguage();

	return useQuery<Stage[]>({
		queryKey: ["stages", language],
		queryFn: () =>
			fetchFromApi(
				`/applications?populate=icon&locale=${language}`,
				undefined,
				USE_MOCK ? fakeStage : undefined
			),
	});
}
