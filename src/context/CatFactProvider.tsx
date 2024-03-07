import {
	createContext,
	useContext,
	ReactNode,
	useState,
	Dispatch,
	SetStateAction,
	useEffect,
	useMemo,
} from "react";
import { AxiosError, axiosInstance } from "../services/apiService";

type CatFactContextType = {
	catFact: string;
	setCatFact: Dispatch<SetStateAction<string>>;
	loading: boolean;
	error: AxiosError | null;
	fetchCatFact: () => Promise<void>;
};

const CatFactContext = createContext<CatFactContextType | undefined>(undefined);

type CatFactProviderProps = {
	children: ReactNode;
};

const CatFactProvider = ({ children }: CatFactProviderProps) => {
	const [catFact, setCatFact] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<AxiosError | null>(null);

	const fetchData = async () => {
		setLoading(true);

		try {
			const response = await axiosInstance.get("facts/random");
			setCatFact(response.data.text);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const contextValue: CatFactContextType = useMemo(() => {
		return {
			catFact,
			setCatFact,
			loading,
			error,
			fetchCatFact: fetchData,
		};
	}, [catFact, setCatFact, loading, error, fetchData]);

	return (
		<CatFactContext.Provider value={contextValue}>
			{children}
		</CatFactContext.Provider>
	);
};

const useCatFactContext = () => {
	const context = useContext(CatFactContext);

	if (!context) {
		throw new Error(
			"useCatFactContext must be used within a CatFactProvider"
		);
	}
    
	return context;
};

export { CatFactContext, CatFactProvider, useCatFactContext };
