import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { DEFAULT_NOTIFICATION_INTERVAL } from "../../utils/constants";

const NotificationFrequency = ({
	notificationInterval,
	handleIntervalChange,
}: {
	notificationInterval: string;
	handleIntervalChange: (e: SelectChangeEvent) => void;
}): JSX.Element => {
	return (
		<>
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
		</>
	);
};

export default NotificationFrequency;
