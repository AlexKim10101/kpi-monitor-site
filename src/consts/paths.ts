import { DEV_BASE_URL } from "./consts";

declare const __IS_PROD_BUNDLE_MODE__: boolean;

const getHost = () => window.location.origin;
const urlProduction = getHost();

export const URL_ADDRESS = __IS_PROD_BUNDLE_MODE__
	? urlProduction
	: DEV_BASE_URL;
