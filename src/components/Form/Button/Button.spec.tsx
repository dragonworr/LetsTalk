import { render, screen } from '@testing-library/react';
import { Button } from '.';

describe('Button component', () => {
  it('renders correctly', () => {
    render(<Button text='Entrar' />);

    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });
});
