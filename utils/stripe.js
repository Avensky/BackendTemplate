import React from 'react'
import StripeScriptLoader from 'react-stripe-script-loader'
import {
  StripeProvider,
  Elements,
  CardNumberElement,
} from 'react-stripe-elements'

const PageWithStripeElements = () => (
    <StripeScriptLoader
      uniqueId="myUniqueId"
      script="https://js.stripe.com/v3/"
      loader="Loading..."
    >
      <StripeProvider apiKey="stripeApiKey">
        <Elements>
          <CardNumberElement />
        </Elements>
      </StripeProvider>
    </StripeScriptLoader>
)

export default PageWithStripeElements