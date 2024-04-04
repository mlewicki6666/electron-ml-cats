import { render, screen, fireEvent } from "@testing-library/react";
import NotificationFrequency from "./NotificationFrequency";
import "@testing-library/jest-dom";

const DEFAULT_NOTIFICATION_INTERVAL = "1";

describe("NotificationFrequency component", () => {
	it("renders correctly with default notification interval", () => {
		const handleIntervalChange = jest.fn();
		const { getByLabelText } = render(
			<NotificationFrequency
				notificationInterval={DEFAULT_NOTIFICATION_INTERVAL}
				handleIntervalChange={handleIntervalChange}
			/>
		);
		const inputLabel = getByLabelText("Notification frequency");

		expect(inputLabel).toBeInTheDocument();
	});

	it("calls handleIntervalChange when select value changes", () => {
		const handleIntervalChange = jest.fn();
		const { getByLabelText } = render(
			<NotificationFrequency
				notificationInterval={DEFAULT_NOTIFICATION_INTERVAL}
				handleIntervalChange={handleIntervalChange}
			/>
		);
		const select = getByLabelText("Notification frequency");
        fireEvent.mouseDown(select); 

        const menuItem = screen.getByRole("option", { name: /5 minutes/i }); 
        fireEvent.click(menuItem); 

		expect(handleIntervalChange).toHaveBeenCalled();
	});
});
