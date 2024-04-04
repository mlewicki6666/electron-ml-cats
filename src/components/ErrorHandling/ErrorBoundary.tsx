import React from "react";

class ErrorBoundary extends React.Component<
	{ fallback: JSX.Element; children: JSX.Element },
	{ hasError: boolean }
> {
	constructor(props: { children: JSX.Element; fallback: JSX.Element }) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(): { hasError: boolean } {
		return { hasError: true };
	}
	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.error(error, errorInfo);
	}
	render() {
		if (this.state.hasError) {
			return this.props.fallback;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
