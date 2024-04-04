import { useState, useEffect } from "react";
import { SelectChangeEvent, Snackbar, Typography } from "@mui/material";
import {
	DEFAULT_NOTIFICATION_INTERVAL,
	CONVERT_TO_MINUTES,
} from "../../utils/constants";
import NotificationFrequency from "../NotificationFrequency/NotificationFrequency";
import CatCard from "../CatCard/CatCard";
import useCatFactContext from "../../hooks/useCatFactContext";

const CatFact = () => {
	const [notificationInterval, setNotificationInterval] = useState(
		DEFAULT_NOTIFICATION_INTERVAL
	);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const { loading, fetchCatFact } = useCatFactContext();
	const handleIntervalChange = (e: SelectChangeEvent) => {
		setNotificationInterval(e.target.value);
	};

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			fetchCatFact();
		}, Number(notificationInterval) * CONVERT_TO_MINUTES);

		return () => {
			clearInterval(intervalId);
		};
	}, [notificationInterval]);

	return (
		<>
			<Typography variant="h2">Cat Fact:</Typography>
			{loading ? (
				<Typography variant="body1" textAlign="center">
					Loading
				</Typography>
			) : (
				<CatCard />
			)}

			<NotificationFrequency
				notificationInterval={notificationInterval}
				handleIntervalChange={handleIntervalChange}
			/>

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
