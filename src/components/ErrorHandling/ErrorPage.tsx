import { Stack, Typography } from "@mui/material";
import CustomCard from "../CatCard/CustomCard";

const ErrorPage = () => {
	return (
		<CustomCard>
			<Stack direction="column" justifyContent="center">
				<Typography variant="body1" textAlign="center">
					Error! Please reload the App.
				</Typography>
			</Stack>
		</CustomCard>
	);
};

export default ErrorPage;
