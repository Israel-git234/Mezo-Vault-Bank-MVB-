import { describe, it, expect } from 'vitest';
import { formatBTC, formatMUSD, truncateAddress } from '@/lib/utils';
import { usdToUnits, btcToSatoshis, satoshisToBTC, formatBTCPrice } from '@/lib/contracts';

describe('formatters', () => {
  it('formats BTC', () => {
    expect(formatBTC(0.00001234)).toContain('BTC');
  });
  it('formats MUSD', () => {
    expect(formatMUSD(1234.56)).toBe('$1,234.56');
  });
  it('truncates address', () => {
    expect(truncateAddress('0x1234567890abcdef1234567890abcdef12345678')).toMatch(/^0x1234/);
  });
});

describe('unit conversions', () => {
  it('usdToUnits uses 2 decimals', () => {
    expect(usdToUnits(12.34)).toBe(BigInt(1234));
  });
  it('btcToSatoshis converts correctly', () => {
    expect(btcToSatoshis(0.00000001)).toBe(BigInt(1));
  });
  it('satoshisToBTC converts correctly', () => {
    expect(satoshisToBTC(BigInt(100000000))).toBe(1);
  });
  it('formatBTCPrice has 8 decimals', () => {
    expect(formatBTCPrice(67500)).toBe(BigInt(6750000000000));
  });
});


