import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useConfirm, ConfirmProvider } from '../hooks/useConfirm';

function TestComponent({ onConfirm = vi.fn() }) {
  const { confirm } = useConfirm();

  const handleClick = () => {
    confirm({
      title: 'Test Confirmation',
      description: 'Are you sure?',
      onConfirm,
    });
  };

  return <button onClick={handleClick}>Show Confirm</button>;
}

describe('useConfirm', () => {
  it('throws error when used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useConfirm must be used within a ConfirmProvider');
    
    consoleError.mockRestore();
  });

  it('shows confirmation dialog when triggered', async () => {
    render(
      <ConfirmProvider>
        <TestComponent />
      </ConfirmProvider>
    );

    await userEvent.click(screen.getByText('Show Confirm'));
    
    expect(screen.getByText('Test Confirmation')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('handles confirmation flow correctly', async () => {
    const onConfirm = vi.fn();
    
    render(
      <ConfirmProvider>
        <TestComponent onConfirm={onConfirm} />
      </ConfirmProvider>
    );

    await userEvent.click(screen.getByText('Show Confirm'));
    await userEvent.click(screen.getByText('Confirm'));
    
    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });
  });

  it('handles cancellation correctly', async () => {
    const onConfirm = vi.fn();
    
    render(
      <ConfirmProvider>
        <TestComponent onConfirm={onConfirm} />
      </ConfirmProvider>
    );

    await userEvent.click(screen.getByText('Show Confirm'));
    await userEvent.click(screen.getByText('Cancel'));
    
    expect(onConfirm).not.toHaveBeenCalled();
  });
});