import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./Dialog";
import { Button } from "./Button";
import { AlertTriangleIcon, LoaderIcon, CheckIcon, XIcon } from "./icons";
import type { ConfirmDialogProps } from "../types";

export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  title = "Confirm Action",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  icon,
  variant = "default",
}: ConfirmDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setIsLoading(false);
      setError(undefined);
      setSuccess(undefined);
    }
  }, [open]);

  const handleConfirm = async () => {
    setIsLoading(true);
    setError(undefined);
    setSuccess(undefined);

    try {
      await onConfirm();
      setSuccess("Operation completed successfully");
      setTimeout(() => onOpenChange(false), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = () => {
    if (isLoading) return <LoaderIcon className="animate-spin text-blue-600" />;
    if (error) return <XIcon className="text-red-600" />;
    if (success) return <CheckIcon className="text-green-600" />;
    return icon || <AlertTriangleIcon className="text-yellow-600" />;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            {getStatusIcon()}
          </div>
          <DialogTitle className="text-center">{title}</DialogTitle>
          {description && !error && !success && (
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          )}
          {error && (
            <DialogDescription className="text-center text-red-600">
              {error}
            </DialogDescription>
          )}
          {success && (
            <DialogDescription className="text-center text-green-600">
              {success}
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={variant}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
