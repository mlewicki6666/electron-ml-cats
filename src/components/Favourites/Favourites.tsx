import { Typography } from "@mui/material";
import useFavourites from "../../hooks/useFavourites";
import CustomCard from "../CatCard/CustomCard";

const Favourites = () => {
	const { favorites } = useFavourites();

	return (
		<div>
			<Typography variant="h2">Favourites</Typography>
			{favorites.length ? (
				favorites.map((element, index) => (
					<CustomCard key={index} data-testid="favourite-card">
						<Typography variant="body1" justifyContent="center">
							{element}
						</Typography>
					</CustomCard>
				))
			) : (
				<Typography variant="body1" justifyContent="center">
					No elements in favourites
				</Typography>
			)}
		</div>
	);
};

export default Favourites;
