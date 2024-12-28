# @stackblitz/react-confirm

A flexible and customizable confirmation dialog component for React applications.

## Features

- 🎨 Fully customizable UI components
- 🎯 Type-safe with TypeScript
- 🔄 Handles nested confirmations
- 📱 Responsive design
- 🎭 Multiple variants support
- 🌈 Tailwind CSS integration
- ⌨️ Keyboard accessible
- 🔍 Screen reader friendly

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage Examples](#usage-examples)
- [API Reference](#api-reference)
  - [Providers](#providers)
  - [Hooks](#hooks)
  - [Components](#components)
  - [Types](#types)
- [Best Practices](#best-practices)
- [License](#license)

## Installation

```bash
npm install @stackblitz/react-confirm
```

## Quick Start

1. Wrap your app with `ConfirmProvider`:

```tsx
import { ConfirmProvider } from '@stackblitz/react-confirm';

function App() {
  return (
    <ConfirmProvider>
      <YourApp />
    </ConfirmProvider>
  );
}
```

2. Use the `useConfirm` hook in your components:

```tsx
import { useConfirm } from '@stackblitz/react-confirm';

function DeleteButton() {
  const confirm = useConfirm();

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete Item',
      description: 'Are you sure you want to delete this item?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'destructive',
    });

    if (confirmed) {
      // Perform delete operation
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

## Usage Examples

### Basic Confirmation

```tsx
const { confirm } = useConfirm();

const handleAction = async () => {
  const confirmed = await confirm({
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed?'
  });
  
  if (confirmed) {
    // Handle confirmation
  }
};
```

### With Async Operation

```tsx
const { confirm } = useConfirm();

const handleSave = async () => {
  const confirmed = await confirm({
    title: 'Save Changes',
    description: 'Save all pending changes?',
    onConfirm: async () => {
      await saveData();
    }
  });
};
```

### Custom Dialog

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Button } from '@stackblitz/react-confirm';

function CustomDialog() {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Custom Dialog</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          {/* Custom content */}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## API Reference

### Providers

#### `ConfirmProvider`

Root provider for global confirmation dialogs.

```tsx
import { ConfirmProvider } from '@stackblitz/react-confirm';

<ConfirmProvider>
  {children}
</ConfirmProvider>
```

Props:
- `children`: `React.ReactNode` - Child components that will have access to the confirmation context

### Hooks

#### `useConfirm`

Hook for using the global confirmation dialog.

```tsx
const { 
  confirm, 
  updateDialog, 
  closeDialog 
} = useConfirm();
```

Returns:
- `confirm`: `(options?: DialogOptions & { onConfirm?: () => Promise<void> }) => Promise<boolean>`
  - Shows the confirmation dialog and returns a promise that resolves to boolean
  - Options:
    - `title`: `string` - Dialog title
    - `description`: `string` - Dialog description
    - `confirmText`: `string` - Text for confirm button (default: "Confirm")
    - `cancelText`: `string` - Text for cancel button (default: "Cancel")
    - `icon`: `React.ReactNode` - Custom icon component
    - `variant`: `'default' | 'destructive'` - Dialog variant
    - `onConfirm`: `() => Promise<void>` - Async function to execute on confirmation

- `updateDialog`: `(options: Partial<DialogOptions>) => void`
  - Updates the current dialog's content
  - Useful for showing progress or changing messages

- `closeDialog`: `() => void`
  - Programmatically close the dialog

#### `useConfirmation`

Hook for managing local confirmation state without UI.

```tsx
const {
  isOpen,
  confirm,
  handleConfirm,
  handleCancel
} = useConfirmation();
```

Returns:
- `isOpen`: `boolean` - Current open state
- `confirm`: `(options?: ConfirmationOptions) => Promise<boolean>`
  - Triggers confirmation flow
  - Options:
    - `onConfirm`: `() => Promise<void> | void`
    - `onCancel`: `() => void`
- `handleConfirm`: `() => Promise<void>` - Handle confirmation action
- `handleCancel`: `() => void` - Handle cancellation

### Components

#### `Dialog`

Base dialog component built on Radix UI's Dialog primitive.

```tsx
import { Dialog } from '@stackblitz/react-confirm';

<Dialog
  open={boolean}
  onOpenChange={(open: boolean) => void}
>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {children}
  </DialogContent>
</Dialog>
```

Props:
- `open`: `boolean` - Controls dialog visibility
- `onOpenChange`: `(open: boolean) => void` - Called when open state changes
- `children`: `React.ReactNode` - Dialog content

#### `DialogContent`

Container for dialog content with animations and styling.

Props:
- `children`: `React.ReactNode`
- `className?`: `string`

#### `DialogHeader`

Standard header section for dialogs.

Props:
- `children`: `React.ReactNode`
- `className?`: `string`

#### `DialogFooter`

Footer section for dialog actions.

Props:
- `children`: `React.ReactNode`
- `className?`: `string`

#### `DialogTitle`

Accessible dialog title component.

Props:
- `children`: `React.ReactNode`
- `className?`: `string`

#### `DialogDescription`

Accessible dialog description component.

Props:
- `children`: `React.ReactNode`
- `className?`: `string`

#### `ConfirmDialog`

Pre-built confirmation dialog with standard layout and behaviors.

```tsx
<ConfirmDialog
  open={boolean}
  onOpenChange={(open: boolean) => void}
  onConfirm={() => Promise<void>}
  onCancel={() => void}
  title="Confirm Action"
  description="Are you sure?"
  confirmText="Confirm"
  cancelText="Cancel"
  icon={<CustomIcon />}
  variant="default"
/>
```

Props:
- `open`: `boolean` - Controls dialog visibility
- `onOpenChange`: `(open: boolean) => void` - Called when open state changes
- `onConfirm`: `() => Promise<void>` - Called when confirmed
- `onCancel`: `() => void` - Called when cancelled
- `title?`: `string` - Dialog title
- `description?`: `string` - Dialog description
- `confirmText?`: `string` - Confirm button text
- `cancelText?`: `string` - Cancel button text
- `icon?`: `React.ReactNode` - Custom icon
- `variant?`: `'default' | 'destructive'` - Visual variant

#### `Button`

Styled button component used in dialogs.

```tsx
<Button
  variant="default"
  size="default"
  className="custom-class"
>
  Click me
</Button>
```

Props:
- `variant?`: `'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'`
- `size?`: `'default' | 'sm' | 'lg' | 'icon'`
- All standard button props

### Types

```tsx
interface DialogOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'destructive';
}

interface ConfirmationOptions {
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => void;
}

interface ConfirmDialogProps extends DialogOptions {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}
```

## Best Practices

1. **Global vs Local Dialogs**
   - Use `useConfirm` for app-wide confirmations
   - Use `useConfirmation` with custom UI for localized dialogs

2. **Error Handling**
   - Always handle async operations in `onConfirm`
   - Use try/catch blocks for error states

3. **Accessibility**
   - Provide descriptive titles and descriptions
   - Use appropriate ARIA labels
   - Ensure keyboard navigation works

4. **UI/UX Guidelines**
   - Use appropriate variants for different actions
   - Keep descriptions clear and concise
   - Show loading states during async operations

## License

MIT License
```
