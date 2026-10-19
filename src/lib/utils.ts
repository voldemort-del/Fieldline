/**
 * Financial & Date Formatting Utilities for Fieldline
 * Provides strict currency precision, rounding, and formatting per UK standards (£ GBP).
 */

export function formatGbp(amount: number): string {
  const safeAmount = isNaN(amount) ? 0 : amount;
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safeAmount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function calculateLineTotal(quantity: number, unitPrice: number): number {
  const safeQty = Math.max(0, isNaN(quantity) ? 0 : quantity);
  const safePrice = Math.max(0, isNaN(unitPrice) ? 0 : unitPrice);
  return Math.round(safeQty * safePrice * 100) / 100;
}

export function calculateQuoteTotals(
  items: Array<{ quantity: number; unitPrice: number }>,
  discount = 0
): { subtotal: number; discount: number; finalTotal: number } {
  const subtotal = items.reduce((acc, item) => {
    return acc + calculateLineTotal(item.quantity, item.unitPrice);
  }, 0);

  const roundedSubtotal = Math.round(subtotal * 100) / 100;
  const safeDiscount = Math.max(0, isNaN(discount) ? 0 : discount);
  const finalTotal = Math.max(0, Math.round((roundedSubtotal - safeDiscount) * 100) / 100);

  return {
    subtotal: roundedSubtotal,
    discount: safeDiscount,
    finalTotal,
  };
}
