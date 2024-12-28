import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/Dialog';

describe('Dialog', () => {
  it('renders dialog content when open', () => {
    render(
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
          <div>Dialog content</div>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('Dialog content')).toBeInTheDocument();
  });

  it('calls onOpenChange when close button is clicked', async () => {
    const handleOpenChange = vi.fn();
    
    render(
      <Dialog open={true} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    await userEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('handles ESC key to close dialog', async () => {
    const handleOpenChange = vi.fn();
    
    render(
      <Dialog open={true} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    await userEvent.keyboard('{Escape}');
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });
});