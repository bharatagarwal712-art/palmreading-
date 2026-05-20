export type RazorpayCheckoutConfig = {
  key: string;
  amount: number;
  currency: "INR";
  name: string;
  description: string;
  orderId?: string;
};

export const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "";

export function createRazorpayPlaceholderConfig(
  overrides: Partial<RazorpayCheckoutConfig> = {},
): RazorpayCheckoutConfig {
  return {
    key: razorpayKeyId,
    amount: 0,
    currency: "INR",
    name: "Palm AI",
    description: "Premium reading placeholder",
    ...overrides,
  };
}
