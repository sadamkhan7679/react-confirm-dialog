import React, { createContext, useCallback, useContext } from "react";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { useConfirmation } from "./useConfirmation";
import type { DialogOptions } from "../types";

interface ConfirmContextValue {
  confirm: (
    options?: DialogOptions & { onConfirm?: () => Promise<void> },
  ) => Promise<boolean>;
  updateDialog: (options: Partial<DialogOptions>) => void;
  closeDialog: () => void;
}

const ConfirmContext = createContext<ConfirmContextValue | undefined>(
  undefined,
);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const {
    isOpen,
    options,
    confirm,
    updateDialog,
    handleConfirm,
    handleCancel,
  } = useConfirmation();

  const closeDialog = useCallback(() => {
    handleCancel();
  }, [handleCancel]);

  const value = React.useMemo(
    () => ({
      confirm,
      updateDialog,
      closeDialog,
    }),
    [confirm, updateDialog, closeDialog],
  );

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      <ConfirmDialog
        open={isOpen}
        onOpenChange={(open) => !open && handleCancel()}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        {...options}
      />
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context;
}
