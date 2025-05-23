import { createContext, useContext, useState } from "react";

type LanguageContextType = {
	language: string;
	setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
	language: "en",
	setLanguage: () => {},
});

export const LanguageProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [language, setLanguage] = useState("en");

	return (
		<LanguageContext.Provider value={{ language, setLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = () => useContext(LanguageContext);
