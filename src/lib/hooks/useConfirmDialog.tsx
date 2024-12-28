import React, { createContext, useContext, useCallback } from 'react';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useConfirmation } from './useConfirmation';

interface ConfirmDialogOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'destructive';
  onConfirm?: () => Promise<void>;
}

interface ConfirmDialogContextValue {
  confirm: (options?: ConfirmDialogOptions) => Promise<boolean>;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextValue | undefined>(undefined);

export function ConfirmDialogProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, confirm, handleConfirm, handleCancel } = useConfirmation();
  const [options, setOptions] = React.useState<ConfirmDialogOptions>({});

  const showConfirmDialog = useCallback((dialogOptions: ConfirmDialogOptions = {}) => {
    setOptions(dialogOptions);
    return confirm({
      onConfirm: dialogOptions.onConfirm,
    });
  }, [confirm]);

  return (
    <ConfirmDialogContext.Provider value={{ confirm: showConfirmDialog }}>
      {children}
      <ConfirmDialog
        open={isOpen}
        onOpenChange={(open) => !open && handleCancel()}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        {...options}
      />
    </ConfirmDialogContext.Provider>
  );
}

export function useConfirmDialog() {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error('useConfirmDialog must be used within a ConfirmDialogProvider');
  }
  return context;
}