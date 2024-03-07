import { render, screen } from "@testing-library/react";
import Favourites from "./Favourites";
import "@testing-library/jest-dom";

jest.mock("../../hooks/useFavourites", () => ({
	__esModule: true,
	default: jest.fn(() => ({ favorites: ["Cat 1", "Cat 2", "Cat 3"] })),
}));

describe("Favourites component", () => {
	it("renders Favourites component with the correct title", () => {
		render(<Favourites />);
		const titleElement = screen.getByRole("heading", { level: 2 });
		expect(titleElement).toBeInTheDocument();
		expect(titleElement).toHaveTextContent("Favourites");
	});

	it("renders list of favorite elements correctly", () => {
		render(<Favourites />);
		const cardElements = screen.getAllByTestId("favourite-card");
		expect(cardElements).toHaveLength(3);

		cardElements.forEach((card: any, index: number) => {
			const catText = screen.getByText(`Cat ${index + 1}`);
			expect(catText).toBeInTheDocument();
		});
	});

	it('renders "No elements in favourites" when there are no favorites', () => {
		jest.spyOn(
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			require("../../hooks/useFavourites"),
			"default"
		).mockReturnValueOnce({ favorites: [] });
		render(<Favourites />);
		const noElementsText = screen.getByText("No elements in favourites");
		expect(noElementsText).toBeInTheDocument();
	});
});
