import { render, screen } from "@testing-library/react";
import CatFact from "./CatFact";
import "@testing-library/jest-dom";

jest.mock("../../hooks/useFavourites", () => ({
	__esModule: true,
	default: jest.fn(() => ({
		saveFavourite: jest.fn(),
		removeFavourite: jest.fn(),
	})),
}));

jest.mock("../../hooks/useFetchCatFact", () => ({
	__esModule: true,
	default: jest.fn(() => ({
		catFact: "Test Cat Fact",
		error: null,
		loading: false,
		fetchCatFact: jest.fn(),
	})),
}));

describe("CatFact component", () => {
	it("renders CatFact component with the correct title", () => {
		render(<CatFact />);
		const titleElement = screen.getByRole("heading", { level: 2 });
		expect(titleElement).toBeInTheDocument();
		expect(titleElement).toHaveTextContent("Cat Fact:");
	});

	it("renders cat fact when not loading", () => {
		render(<CatFact />);
		const catFactText = screen.getByText("Test Cat Fact");
		expect(catFactText).toBeInTheDocument();
	});
});
