import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/Button';
import { Mail } from 'lucide-react';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('displays loading state correctly', () => {
    render(<Button loading loadingText="Processing...">Submit</Button>);
    
    expect(screen.getByText('Processing...')).toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
  });

  it('renders start and end icons', () => {
    render(
      <Button 
        startIcon={<Mail data-testid="start-icon" />}
        endIcon={<Mail data-testid="end-icon" />}
      >
        Email
      </Button>
    );

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('applies different variants correctly', () => {
    const { rerender } = render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByText('Delete')).toHaveClass('bg-red-500');

    rerender(<Button variant="outline">Cancel</Button>);
    expect(screen.getByText('Cancel')).toHaveClass('border-slate-200');
  });

  it('handles disabled state', async () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByText('Click me');
    expect(button).toBeDisabled();
    
    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});