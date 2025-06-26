import { useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "./api";
import {
	Navigation,
	Caption,
	Solution,
	Client,
	KeyFunction,
	News,
	AllNews,
	Operation,
	Stage,
	Locale,
	Articles,
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
	fakeArticle_1,
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

export function useAllNews() {
	const { language } = useLanguage();

	return useQuery<AllNews[]>({
		queryKey: ["allnews", language],
		queryFn: () =>
			fetchFromApi(
				`/news?populate=picture&locale=${language}`,
				undefined,
				USE_MOCK ? [] : undefined
			),
	});
}
///news?filters[id][$eq]=${id}&populate[content][populate]=*&locale=${language}
//https://kpi-site.profitproject.ru/api/news?filters[id][$eq]=24&populate[content][populate]=*&locale=${language}
///news?filters[id][$eq]=${id}&locale=${language}&populate[content][on][shared.card-block][populate][card][populate]=logo

///news?filters[id][$eq]=${id}&locale=${language}&populate[content]=*&populate[content][on][shared.card-block][populate][card][populate]=logo

///news?filters[id][$eq]=${id}&locale=${language}&populate[content]=*&populate[content][on][shared.card-block][populate][card][populate]=logo

//news?filters[id][$eq]=${id}&locale=${language}&populate[content][populate]=shared.media,shared.subhead,shared.rich-text&populate[content][on][shared.card-block][populate][card][populate]=logo

///news?filters[id][$eq]=${id}&locale=${language}&populate[content][populate][0]=shared.media&populate[content][populate][1]=shared.rich-text&populate[content][populate][2]=shared.image-block&populate[content][on][shared.card-block][populate][card][populate]=logo

export function useSingleNews(id: string) {
	const { language } = useLanguage();

	return useQuery<Articles[]>({
		queryKey: ["article", id, language],
		queryFn: () =>
			fetchFromApi(
				`/news?filters[id][$eq]=${id}&populate[content][populate]=*&locale=${language}`,
				undefined,
				USE_MOCK ? fakeArticle_1 : undefined
			),
	});
}

export function useCardBlockData(id: string) {
	const { language } = useLanguage();

	return useQuery<Articles[]>({
		queryKey: ["cardBlock", id, language],
		queryFn: () =>
			fetchFromApi(
				`/news?filters[id][$eq]=${id}&locale=${language}&populate[content][on][shared.card-block][populate][card][populate]=logo`,
				undefined,
				USE_MOCK ? fakeArticle_1 : undefined
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

export const useAppContent = () => {
	const captionsQuery = useCaptions();
	const buttonsQuery = useButtons();
	const navigationQuery = useNavigation();

	const isLoading =
		captionsQuery.isLoading ||
		buttonsQuery.isLoading ||
		navigationQuery.isLoading;

	const error =
		captionsQuery.error || buttonsQuery.error || navigationQuery.error;

	const dataAvailable =
		captionsQuery.data && buttonsQuery.data && navigationQuery.data;

	return {
		captions: captionsQuery.data || [],
		btnCaptions: buttonsQuery.data || [],
		navData: navigationQuery.data || [],
		isLoading,
		error,
		isSuccess: !!dataAvailable,
	};
};
