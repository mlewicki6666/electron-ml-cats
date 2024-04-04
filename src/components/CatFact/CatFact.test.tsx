import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CatFact from "./CatFact";
import { CatFactProvider } from "../../context/CatFactProvider";
import "@testing-library/jest-dom";

jest.mock("../../hooks/useFavourites", () => ({
	__esModule: true,
	default: jest.fn(() => ({
		saveFavourite: jest.fn(),
		removeFavourite: jest.fn(),
	})),
}));

describe("CatFact component", () => {
	jest.useFakeTimers();
	it("renders cat fact correctly", async () => {
		render(
			<CatFactProvider>
				<CatFact />
			</CatFactProvider>
		);

		expect(screen.getByText(/loading/i)).toBeInTheDocument();

		expect(
			screen.queryByText(/error while getting cat data/i)
		).not.toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByText(/cat fact/i)).toBeInTheDocument();
		});
	});
	it("displays notification frequency selector", () => {
		render(
			<CatFactProvider>
				<CatFact />
			</CatFactProvider>
		);

		expect(
			screen.getByLabelText(/notification frequency/i)
		).toBeInTheDocument();
	});
});
