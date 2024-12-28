import { ReactNode } from "react";

export interface DialogOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  icon?: ReactNode;
  variant?: "default" | "destructive";
}

export interface ConfirmDialogProps extends DialogOptions {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}
