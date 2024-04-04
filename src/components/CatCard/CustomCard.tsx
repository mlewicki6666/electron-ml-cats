import styled from "@emotion/styled";
import { Card, CardProps } from "@mui/material";

const CustomCard = styled(Card)<CardProps>(() => ({
	display: "flex",
	justifyContent: "center",
	padding: 32,
	marginBottom: 5,
}));

export default CustomCard;
