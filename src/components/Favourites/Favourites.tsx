import { Typography } from "@mui/material";
import { CustomCard } from "../CatFact/CatFact";
import useFavourites from "../../hooks/useFavourites";

const Favourites = () => {
	const{ favorites } = useFavourites();


	return (
		<div>
			<Typography variant="h2">Favourites</Typography>
			{favorites.length ? (
				favorites.map((element, index) => (
					<CustomCard key={index}>
						<Typography variant="h5" justifyContent="center">
							{element}
						</Typography>
					</CustomCard>
				))
			) : (
				<Typography variant="h5" justifyContent="center">
					No elements in favourites
				</Typography>
			)}
		</div>
	);
};

export default Favourites;
