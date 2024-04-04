import { render, screen, fireEvent } from "@testing-library/react";
import CatCard from "./CatCard";
import "@testing-library/jest-dom";

jest.mock("../../hooks/useCatFactContext", () => ({
	__esModule: true,
	default: jest.fn(() => ({
		catFact: "Test cat fact",
		fetchCatFact: jest.fn(),
	})),
}));

describe("CatCard component", () => {
	it("renders CatCard component with the correct content", () => {
		render(<CatCard />);
		const catFactElement = screen.getByText("Test cat fact");
		expect(catFactElement).toBeInTheDocument();
	});

	it("shows buttons on mouse over", () => {
		render(<CatCard />);
		const cardElement = screen.getByTestId("custom-card");
		fireEvent.mouseOver(cardElement);
		const addButton = screen.getByText("Add to Favourites");
		const removeButton = screen.getByText("Remove from Favourites");
		expect(addButton).toBeInTheDocument();
		expect(removeButton).toBeInTheDocument();
	});
});
