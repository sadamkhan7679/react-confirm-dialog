import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmDialog } from '../components/ConfirmDialog';

describe('ConfirmDialog', () => {
  const defaultProps = {
    open: true,
    onOpenChange: vi.fn(),
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
    title: 'Confirm Action',
    description: 'Are you sure?',
  };

  it('renders with default props', () => {
    render(<ConfirmDialog {...defaultProps} />);
    
    expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('handles successful confirmation', async () => {
    const onConfirm = vi.fn().mockResolvedValue(undefined);
    
    render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />);
    
    await userEvent.click(screen.getByText('Confirm'));
    
    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });
  });

  it('handles failed confirmation', async () => {
    const error = new Error('Test error');
    const onConfirm = vi.fn().mockRejectedValue(error);
    
    render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />);
    
    await userEvent.click(screen.getByText('Confirm'));
    
    await waitFor(() => {
      expect(screen.getByText(error.message)).toBeInTheDocument();
    });
  });

  it('shows loading state during confirmation', async () => {
    const onConfirm = vi.fn().mockImplementation(() => new Promise(resolve => {
      setTimeout(resolve, 100);
    }));
    
    render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />);
    
    await userEvent.click(screen.getByText('Confirm'));
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});