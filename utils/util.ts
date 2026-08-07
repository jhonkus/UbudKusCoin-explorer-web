import numeral from 'numeral';
import { format } from 'timeago.js';

export function timeAgo(unixTimestamp: number): string {
  if (!unixTimestamp || Number(unixTimestamp) <= 0) {
    return '-';
  }
  return format(new Date(Number(unixTimestamp) * 1000));
}

export function toDate(unixTimestamp: number): string {
  if (!unixTimestamp || Number(unixTimestamp) <= 0) {
    return '-';
  }
  const date = new Date(Number(unixTimestamp) * 1000);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${date.getFullYear()} ${hours}:${minutes}`;
}

export function formatAmount(amount: number): string {
  return numeral(amount).format('0,0.00000');
}

export function formatTotalReward(amount: number): string {
  return numeral(amount).format('0,0.00');
}

export function formatNum(amount: number): string {
  return numeral(amount).format('0,0');
}

/** Alias for formatting a total amount with 2 decimals. */
export const formatTotalTxns = formatTotalReward;

export function formatFee(amount: number): string {
  return numeral(amount).format('0,0.00000000');
}

export function formatBytes(amount: number): string {
  return numeral(amount).format('0,0');
}

export function convertDate(unixTimestamp: string | number): string {
  const date = new Date(Number(unixTimestamp) * 1000);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function truncateText(value: string | null | undefined, visible = 12): string {
  if (!value) {
    return '-';
  }

  const text = String(value);
  if (text.length <= visible * 2) {
    return text;
  }

  return `${text.slice(0, visible)}...${text.slice(-visible)}`;
}
