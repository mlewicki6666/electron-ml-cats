import { useState, useEffect } from "react";
import {
	Button,
	Card,
	CardProps,
	InputLabel,
	MenuItem,
	Select,
	Snackbar,
	Stack,
	Typography,
	styled,
} from "@mui/material";
import {
	DEFAULT_NOTIFICATION_INTERVAL,
	CONVERT_TO_MINUTES,
} from "../../utils/constants";
import useFetchCatFact from "../../hooks/useFetchCatFact";
import useFavourites from "../../hooks/useFavourites";

export const CustomCard = styled(Card)<CardProps>(() => ({
	display: "flex",
	justifyContent: "center",
	padding: 32,
	marginBottom: 5,
}));

const CatFact = () => {
	const [mouseOver, setMouseOver] = useState(false);
	const [notificationInterval, setNotificationInterval] = useState(
		DEFAULT_NOTIFICATION_INTERVAL
	);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const { catFact, error, loading, fetchCatFact } = useFetchCatFact();
	const { saveFavourite, removeFavourite } = useFavourites();

	const addFavourites = () => {
		saveFavourite(catFact);
		fetchCatFact();
	};

	const removeFavourites = () => {
		removeFavourite(catFact);
		fetchCatFact();
	};

	const handleIntervalChange = (event: any) => {
		setNotificationInterval(event.target.value);
	};

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	const handleMouseOver = () => {
		setMouseOver(true);
	};
	const handleMouseOut = () => {
		setMouseOver(false);
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			fetchCatFact();
		}, notificationInterval * CONVERT_TO_MINUTES);

		return () => {
			clearInterval(intervalId);
		};
	}, [notificationInterval]);

	if (error) {
		return (
			<Typography variant="h2">Error while getting cat data.</Typography>
		);
	}

	return (
		<>
			<Typography variant="h2">Cat Fact:</Typography>
			{loading ? (
				<Typography variant="body1">
					Loading
				</Typography>
			) : (
				<CustomCard
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
				>
					<Stack direction="column" justifyContent="center" data-testid='cat-fact-card'>
						<Typography variant="h5" textAlign="center">
							{catFact}
						</Typography>
						{mouseOver && (
							<Stack
								direction="row"
								justifyContent="space-between"
								p={2}
							>
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
			)}

			<InputLabel id="notification-frequency-label">
				Notification frequency
			</InputLabel>
			<Select
				labelId="notification-frequency-label"
				id="notification-frequency"
				value={notificationInterval}
				label="Frequency"
				onChange={handleIntervalChange}
			>
				<MenuItem value={DEFAULT_NOTIFICATION_INTERVAL}>
					Minute
				</MenuItem>
				<MenuItem value={5}>5 minutes</MenuItem>
				<MenuItem value={30}>Half hour</MenuItem>
			</Select>

			<Snackbar
				autoHideDuration={5000}
				message={`New fact available!`}
				open={snackbarOpen}
				onClose={handleSnackbarClose}
			/>
		</>
	);
};

export default CatFact;
