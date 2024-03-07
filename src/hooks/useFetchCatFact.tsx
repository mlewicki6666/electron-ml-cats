import { useEffect, useState } from "react";
import { AxiosError, axiosInstance } from "../services/apiService";

type UseFetchDataReturnedType = {
	catFact: string;
	loading: boolean;
	error: AxiosError | null;
	fetchCatFact: () => Promise<void>;
};

const useFetchCatFact = (): UseFetchDataReturnedType => {
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

	return { catFact, loading, error, fetchCatFact: fetchData };
};

export default useFetchCatFact;
