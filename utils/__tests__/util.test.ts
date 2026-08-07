import {
  formatAmount,
  formatFee,
  formatNum,
  formatTotalReward,
  truncateText,
  toDate,
  convertDate,
  formatBytes,
} from '../util';
import {
  normalizeBlock,
  normalizeTxn,
  normalizeAccount,
  normalizeSearchResult,
  normalizeArray,
} from '../normalize';

describe('util.ts', () => {
  describe('formatAmount()', () => {
    it('formats numbers with 5 decimal places and thousand separators', () => {
      expect(formatAmount(1234567.89)).toBe('1,234,567.89000');
    });

    it('formats 0 correctly', () => {
      expect(formatAmount(0)).toBe('0.00000');
    });
  });

  describe('formatFee()', () => {
    it('formats numbers with 8 decimal places', () => {
      expect(formatFee(0.0001)).toBe('0.00010000');
    });
  });

  describe('formatNum()', () => {
    it('formats integers with thousand separators', () => {
      expect(formatNum(1000000)).toBe('1,000,000');
    });
  });

  describe('truncateText()', () => {
    it('returns "-" for null/undefined/empty string', () => {
      expect(truncateText(null)).toBe('-');
      expect(truncateText(undefined)).toBe('-');
      expect(truncateText('')).toBe('-');
    });

    it('returns short string unchanged if <= visible * 2', () => {
      expect(truncateText('short', 12)).toBe('short');
    });

    it('truncates long text in the middle with ellipses', () => {
      const longHash = '0x551fc7930a744c1a0665391cc4923f17d50231c014085814f591f23d1934e85b';
      const truncated = truncateText(longHash, 8);
      expect(truncated).toBe('0x551fc7...1934e85b');
    });
  });

  describe('toDate() and convertDate()', () => {
    it('converts unix timestamp to formatted date string', () => {
      const timestamp = 1700000000;
      expect(typeof toDate(timestamp)).toBe('string');
      expect(toDate(timestamp)).toMatch(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/);
    });

    it('converts timestamp to timeHH:MM format', () => {
      expect(convertDate('1700000000')).toMatch(/\d{2}:\d{2}/);
    });
  });
});

describe('normalize.ts', () => {
  describe('normalizeTxn()', () => {
    it('returns null for null/undefined', () => {
      expect(normalizeTxn(null)).toBeNull();
    });

    it('normalizes snake_case RPC fields to Txn object', () => {
      const raw = {
        hash: '0x123',
        time_stamp: '1700000000',
        sender: '4sender',
        recipient: '4recipient',
        amount: '100000000',
        fee: '10000',
        height: '500',
      };
      const normalized = normalizeTxn(raw);
      expect(normalized?.Hash).toBe('0x123');
      expect(normalized?.TimeStamp).toBe(1700000000);
      expect(normalized?.Sender).toBe('4sender');
      expect(normalized?.Recipient).toBe('4recipient');
      expect(normalized?.Amount).toBe(100000000);
      expect(normalized?.Fee).toBe(10000);
      expect(normalized?.Height).toBe(500);
    });
  });

  describe('normalizeBlock()', () => {
    it('normalizes block snake_case fields', () => {
      const raw = {
        height: '100',
        hash: '0xblock',
        time_stamp: '1700000000',
        validator: '4val',
        num_of_tx: '5',
      };
      const block = normalizeBlock(raw);
      expect(block?.Height).toBe(100);
      expect(block?.Hash).toBe('0xblock');
      expect(block?.Validator).toBe('4val');
      expect(block?.NumOfTx).toBe(5);
    });
  });

  describe('normalizeSearchResult()', () => {
    it('returns null for empty input', () => {
      expect(normalizeSearchResult(null)).toBeNull();
    });

    it('normalizes search result object', () => {
      const res = normalizeSearchResult({
        id: '1',
        title: 'Block',
        searchText: '500',
        url: '/blocks/height/500',
        status: 'ok',
      });
      expect(res?.Title).toBe('Block');
      expect(res?.Url).toBe('/blocks/height/500');
    });
  });

  describe('normalizeArray()', () => {
    it('returns empty array when input is not an array', () => {
      expect(normalizeArray(null, (x) => x)).toEqual([]);
    });

    it('applies normalizer function to each element', () => {
      const result = normalizeArray([{ amount: '100' }], (x: any) => ({ amount: Number(x.amount) }));
      expect(result).toEqual([{ amount: 100 }]);
    });
  });
});
