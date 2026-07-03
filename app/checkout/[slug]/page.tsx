import CheckoutClient from "@/components/checkout-client";

export const metadata = { title: "Checkout | Vanguard" };

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CheckoutClient slug={slug} />;
}
