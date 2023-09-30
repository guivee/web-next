import Script from 'next/script'

export default function Subscription({ user_id }: { user_id: string }) {
  return (
    <div className=" m-5 mx-auto max-w-md rounded-xl border bg-white p-3">
      <Script src="https://js.stripe.com/v3/pricing-table.js" />
      {/* @ts-ignore */}
      <stripe-pricing-table
        pricing-table-id="prctbl_1M88JHE5c6OrXvAQKxUEnmYe"
        publishable-key={process.env.STRIPE_APIKEY}
        client-reference-id={user_id}
      >
        {/* @ts-ignore */}
      </stripe-pricing-table>
    </div>
  )
}
