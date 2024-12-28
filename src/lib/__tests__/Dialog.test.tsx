import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/Dialog";

describe("Dialog", () => {
  it("renders dialog content when open", () => {
    render(
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Dialog description</DialogDescription>
          </DialogHeader>
          <div>Dialog content</div>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("Dialog description")).toBeInTheDocument();
    expect(screen.getByText("Dialog content")).toBeInTheDocument();
  });

  it("calls onOpenChange when close button is clicked", async () => {
    const handleOpenChange = vi.fn();

    render(
      <Dialog open={true} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Dialog description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: /close/i }));
    });

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("handles ESC key to close dialog", async () => {
    const handleOpenChange = vi.fn();

    render(
      <Dialog open={true} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Dialog description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    await act(async () => {
      await userEvent.keyboard("{Escape}");
    });

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("has proper ARIA attributes", () => {
    render(
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Dialog description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-describedby", "dialog-description");
  });
});
