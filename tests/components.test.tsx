import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from '@/components/Button';
import BalanceCard from '@/components/BalanceCard';

describe('Button', () => {
  it('renders label', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});

describe('BalanceCard', () => {
  it('renders amount and currency', () => {
    render(
      <BalanceCard
        title="BTC Balance"
        amount="0.01"
        currency="BTC"
      />
    );
    expect(screen.getByText('0.01')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();
  });
});




