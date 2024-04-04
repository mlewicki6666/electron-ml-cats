import { useContext } from "react";
import { CatFactContext } from "..//context/CatFactProvider";

const useCatFactContext = () => {
	const context = useContext(CatFactContext);

	if (!context) {
		throw new Error("useCatFactContext must be used within a CatFactProvider");
	}

	return context;
};

export default useCatFactContext;
