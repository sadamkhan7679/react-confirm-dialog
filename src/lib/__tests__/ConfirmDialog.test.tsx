import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";
import { ConfirmDialog } from "../components/ConfirmDialog";

describe("ConfirmDialog", () => {
  const defaultProps = {
    open: true,
    onOpenChange: vi.fn(),
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
    title: "Confirm Action",
    description: "Are you sure?",
  };

  it("renders with default props", () => {
    render(<ConfirmDialog {...defaultProps} />);

    expect(screen.getByText("Confirm Action")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("handles successful confirmation", async () => {
    const onConfirm = vi.fn().mockResolvedValue(undefined);

    render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />);

    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    });

    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });
  });

  it("handles failed confirmation", async () => {
    const error = new Error("Test error");
    const onConfirm = vi.fn().mockRejectedValue(error);

    render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />);

    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    });

    await waitFor(() => {
      expect(screen.getByText(error.message)).toBeInTheDocument();
    });
  });

  it("shows loading state during confirmation", async () => {
    const onConfirm = vi
      .fn()
      .mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));

    render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />);

    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    });

    const loadingButton = screen.getByRole("button", { name: "Loading..." });
    expect(loadingButton).toBeInTheDocument();
    expect(loadingButton).toHaveAttribute("aria-busy", "true");
    expect(loadingButton).toBeDisabled();
  });

  it("calls onCancel when cancel button is clicked", async () => {
    render(<ConfirmDialog {...defaultProps} />);

    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    });

    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it("resets state when dialog closes", async () => {
    const { rerender } = render(<ConfirmDialog {...defaultProps} />);

    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    });

    rerender(<ConfirmDialog {...defaultProps} open={false} />);

    expect(screen.queryByRole("button", { name: "Loading..." })).not.toBeInTheDocument();
  });
});
