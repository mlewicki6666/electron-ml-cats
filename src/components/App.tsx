import { Container, Tab, Tabs } from "@mui/material";
import CatFact from "./CatFact/CatFact";
import Favourites from "./Favourites/Favourites";
import { SetStateAction, useState } from "react";

function App() {
	const [value, setValue] = useState(0);
	const handleChange = (event: never, newValue: SetStateAction<number>) => {
		setValue(newValue);
	};

	return (
		<Container>
			<Tabs
				value={value}
				onChange={handleChange}
				aria-label="basic tabs example"
			>
				<Tab label="Home" />
				<Tab label="Favourites" />
			</Tabs>
			{value === 0 && <CatFact />}
			{value === 1 && <Favourites />}
		</Container>
	);
}

export default App;
