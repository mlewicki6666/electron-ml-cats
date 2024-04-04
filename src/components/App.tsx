import { Container, Tab, Tabs } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import CatFact from "./CatFact/CatFact";
import Favourites from "./Favourites/Favourites";
import React, { SetStateAction, useState } from "react";
import { CatFactProvider } from "..//context/CatFactProvider";
import ErrorBoundary from "./ErrorHandling/ErrorBoundary";
import ErrorPage from "./ErrorHandling/ErrorPage";

function App() {
	const [value, setValue] = useState(0);
	const handleChange = (event: never, newValue: SetStateAction<number>) => {
		setValue(newValue);
	};

	return (
		<React.StrictMode>
			<CatFactProvider>
				<BrowserRouter>
					<Container>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label="AppliCATion tabs"
						>
							<Tab label="Home" component={Link} to="/" />
							<Tab
								label="Favourites"
								component={Link}
								to="favourites"
							/>
						</Tabs>
						<ErrorBoundary fallback={<ErrorPage />}>
							<Routes>
								<Route path="/" element={<CatFact />}></Route>
								<Route
									path="favourites"
									element={<Favourites />}
								></Route>
								<Route
									path="*"
									element={<Navigate to="/" />}
								></Route>
							</Routes>
						</ErrorBoundary>
					</Container>
				</BrowserRouter>
			</CatFactProvider>
		</React.StrictMode>
	);
}

export default App;
