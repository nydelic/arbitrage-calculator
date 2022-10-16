import { Component, ReactNode } from "react";

interface ArbitrageCalculationsErrorBoundaryProps {
  children: ReactNode;
}
interface ArbitrageCalculationsErrorBoundaryState {
  hasError: boolean;
}

class ArbitrageCalculationsErrorBoundary extends Component<
  ArbitrageCalculationsErrorBoundaryProps,
  ArbitrageCalculationsErrorBoundaryState
> {
  public state = {
    hasError: false,
  };

  static getDerivedStateFromError(
    error: unknown
  ): ArbitrageCalculationsErrorBoundaryState {
    // console.log(error);

    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.log({ error, errorInfo });

    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h2>Something went wrong.</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </>
      );
    }

    return this.props.children;
  }
}

export default ArbitrageCalculationsErrorBoundary;
