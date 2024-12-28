import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../components/Button/Button";
import { SaveIcon } from "../components/icons";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("displays loading state correctly", () => {
    const { container } = render(
      <Button loading loadingText="Processing...">
        Submit
      </Button>,
    );

    expect(screen.getByText("Processing...")).toBeInTheDocument();
    expect(screen.queryByText("Submit")).not.toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveClass("animate-spin");
  });

  it("renders start and end icons", () => {
    const startIcon = <SaveIcon data-testid="start-icon" />;
    const endIcon = <SaveIcon data-testid="end-icon" />;

    render(
      <Button startIcon={startIcon} endIcon={endIcon}>
        Save
      </Button>,
    );

    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
    expect(screen.getByTestId("end-icon")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("applies different variants correctly", () => {
    const { rerender } = render(
      <Button variant="destructive" data-testid="button">
        Delete
      </Button>,
    );

    expect(screen.getByTestId("button")).toHaveClass("bg-red-500");

    rerender(
      <Button variant="outline" data-testid="button">
        Cancel
      </Button>,
    );

    expect(screen.getByTestId("button")).toHaveClass("border-slate-200");
  });

  it("applies different sizes correctly", () => {
    const { rerender } = render(
      <Button size="sm" data-testid="button">
        Small
      </Button>,
    );

    expect(screen.getByTestId("button")).toHaveClass("h-9");

    rerender(
      <Button size="lg" data-testid="button">
        Large
      </Button>,
    );

    expect(screen.getByTestId("button")).toHaveClass("h-11");

    rerender(
      <Button size="icon" data-testid="button">
        <SaveIcon />
      </Button>,
    );

    expect(screen.getByTestId("button")).toHaveClass("h-10", "w-10");
  });

  it("handles disabled state", async () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");

    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
