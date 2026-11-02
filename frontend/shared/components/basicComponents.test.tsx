import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Card } from './card';
import { CardItem } from './cardItem/cardItem';
import { Ellipse } from './ellipse';
import { GoogleSignInButton } from './googleSignInButton/googleSignInButton';
import { Input } from './input/input';
import { Index as Separator } from './separator';
import { Skeleton } from './skeleton/skeleton';
import { TypographyH1 } from './typography/typographyH1';
import { TypographyH2 } from './typography/typographyH2';
import { TypographyH3 } from './typography/typographyH3';
import { TypographyP } from './typography/typographyP';
import { TypographySmall } from './typography/typographySmall';

describe('basic shared components', () => {
  it('renders Card content inside a complementary region', () => {
    render(<Card className="custom-card">Dashboard summary</Card>);

    expect(screen.getByText('Dashboard summary')).toHaveClass('custom-card');
    expect(screen.getByText('Dashboard summary').tagName).toBe('ASIDE');
  });

  it('handles CardItem actions by mouse and keyboard', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<CardItem onClick={onClick}>Open task</CardItem>);
    const action = screen.getByRole('button', { name: 'Open task' });

    await user.click(action);
    action.focus();
    await user.keyboard('{Enter}');

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('keeps non-action CardItem compatible with a parent link', () => {
    render(<CardItem>Current folder</CardItem>);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('Current folder').tagName).toBe('DIV');
  });

  it('updates Input value and keeps adjacent icons non-interactive', async () => {
    const user = userEvent.setup();

    render(
      <Input
        aria-label="Search"
        leftIcon={<span>left</span>}
        rightIcon={<button type="button">Clear</button>}
      />
    );

    const input = screen.getByRole('textbox', { name: 'Search' });
    await user.type(input, 'board');

    expect(input).toHaveValue('board');
    expect(screen.getByRole('button', { name: 'Clear' })).toBeVisible();
  });

  it('submits GoogleSignInButton as a regular user action', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(
      <GoogleSignInButton type="button" onClick={onClick}>
        Sign in with Google
      </GoogleSignInButton>
    );
    await user.click(
      screen.getByRole('button', { name: 'Sign in with Google' })
    );

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies requested Ellipse color and supported size', () => {
    const { container } = render(<Ellipse color="#ff0000" size={16} />);
    const ellipse = container.firstElementChild;

    expect(ellipse).toHaveStyle({ backgroundColor: '#ff0000' });
    expect(ellipse).toHaveClass('h-4', 'w-4');
  });

  it('falls back to the default Ellipse size', () => {
    const { container } = render(<Ellipse color="#000000" size={999} />);

    expect(container.firstElementChild).toHaveClass('h-2', 'w-2');
  });

  it.each([
    ['pulse', 'animate-pulse'],
    ['shimmer', 'before:animate-shimmer'],
  ] as const)('renders %s Skeleton mode', (mode, expectedClass) => {
    const { container } = render(
      <Skeleton mode={mode} className="custom-skeleton" />
    );

    expect(container.firstElementChild).toHaveClass(
      expectedClass,
      'custom-skeleton'
    );
  });

  it('passes orientation to Separator', () => {
    render(<Separator orientation="vertical" aria-label="Section divider" />);

    expect(
      screen.getByRole('separator', { name: 'Section divider' })
    ).toHaveAttribute('data-orientation', 'vertical');
  });

  it('renders every typography value for the user', () => {
    render(
      <>
        <TypographyH1 text="Heading one" />
        <TypographyH2 text="Heading two" />
        <TypographyH3 text="Heading three" />
        <TypographyP text="Paragraph" />
        <TypographySmall text="Supporting text" />
      </>
    );

    expect(screen.getByText('Heading one')).toBeVisible();
    expect(screen.getByText('Heading two')).toBeVisible();
    expect(screen.getByText('Heading three')).toBeVisible();
    expect(screen.getByText('Paragraph')).toBeVisible();
    expect(screen.getByText('Supporting text')).toBeVisible();
  });
});
