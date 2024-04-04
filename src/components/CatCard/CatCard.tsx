import { Stack, Typography, Button } from "@mui/material";
import { useState } from "react";
import useFavourites from "../../hooks/useFavourites";
import useCatFactContext from "../../hooks/useCatFactContext";
import CustomCard from "./CustomCard";

const CatCard = () => {
	const { saveFavourite, removeFavourite } = useFavourites();
	const { catFact, fetchCatFact } = useCatFactContext();
	const [mouseOver, setMouseOver] = useState(false);

	const handleMouseOver = () => {
		setMouseOver(true);
	};
	const handleMouseOut = () => {
		setMouseOver(false);
	};

	const addFavourites = () => {
		saveFavourite(catFact);
		fetchCatFact();
	};

	const removeFavourites = () => {
		removeFavourite(catFact);
		fetchCatFact();
	};

	return (
		<CustomCard
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			data-testid="custom-card"
		>
			<Stack direction="column" justifyContent="center">
				<Typography variant="body1" textAlign="center">
					{catFact}
				</Typography>
				{mouseOver && (
					<Stack direction="row" justifyContent="space-between" p={2}>
						<Button onClick={addFavourites}>
							Add to Favourites
						</Button>
						<Button onClick={removeFavourites}>
							Remove from Favourites
						</Button>
					</Stack>
				)}
			</Stack>
		</CustomCard>
	);
};

export default CatCard;
