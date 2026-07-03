import type { PaymentGateway } from "@/lib/types";

export type PaymentMethod = {
  id: PaymentGateway;
  name: string;
  description: string;
  regions: string[];
};

export const paymentGateways: PaymentMethod[] = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Cards and international payments",
    regions: ["Global"],
  },
  {
    id: "sslcommerz",
    name: "SSLCommerz",
    description: "Bangladesh card and mobile banking",
    regions: ["Bangladesh"],
  },
  {
    id: "bkash",
    name: "bKash",
    description: "Mobile wallet payments",
    regions: ["Bangladesh"],
  },
  {
    id: "nagad",
    name: "Nagad",
    description: "Mobile financial services",
    regions: ["Bangladesh"],
  },
  {
    id: "2checkout",
    name: "2Checkout",
    description: "Global alternative payments",
    regions: ["Global", "Emerging Asia"],
  },
];

export type CheckoutItem = {
  slug: string;
  title: string;
  price: string;
  type: "research" | "program";
};

export function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, "")) || 0;
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function calculateTotal(
  items: CheckoutItem[],
  coupon?: { code: string; discountPercent: number }
): { subtotal: number; discount: number; tax: number; total: number } {
  const subtotal = items.reduce((sum, item) => sum + parsePrice(item.price), 0);
  const discount = coupon ? subtotal * (coupon.discountPercent / 100) : 0;
  const taxable = subtotal - discount;
  const tax = taxable * 0.05;
  return { subtotal, discount, tax, total: taxable + tax };
}

export const demoCoupons: Record<string, number> = {
  VANGUARD10: 10,
  RESEARCH20: 20,
};
