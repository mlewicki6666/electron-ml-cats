import { useState, useEffect } from "react";
import { FAVOURITES } from "../utils/constants";

type UseLocalStorageReturnType = {
	favorites: string[];
	saveFavourite: (catFact: string) => void;
	removeFavourite: (catFact: string) => void;
};

const useLocalStorage = (): UseLocalStorageReturnType => {
	const [favorites, setFavorites] = useState<string[]>(() => {
		try {
			const storedFavorites = localStorage.getItem(FAVOURITES);
			return storedFavorites ? JSON.parse(storedFavorites) : [];
		} catch (error) {
			throw new Error(error);
		}
	});

	const saveFavourite = (catFact: string) => {
		setFavorites([...favorites, catFact]);
		localStorage.setItem(
			FAVOURITES,
			JSON.stringify([...favorites, catFact])
		);
	};

	const removeFavourite = (catFact: string) => {
		const newFav = favorites.filter((item: string) => item !== catFact);

		setFavorites(newFav);
	};

	useEffect(() => {
		localStorage.setItem(FAVOURITES, JSON.stringify(favorites));
	}, [favorites]);

	return { favorites, saveFavourite, removeFavourite };
};

export default useLocalStorage;
