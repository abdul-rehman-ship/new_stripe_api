const express = require("express");
const app = express();
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")('sk_test_51KGj2rFSKLqPZvHzQx1uYFfblXY2EtCxDNew4VElzJFlVUXTa2hXLgllivcCTQXL4lVbjaWVPWHVl6JVrgEO2CTA00l4W4OkZ9');
// sk_test_51KGj2rFSKLqPZvHzQx1uYFfblXY2EtCxDNew4VElzJFlVUXTa2hXLgllivcCTQXL4lVbjaWVPWHVl6JVrgEO2CTA00l4W4OkZ9
app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  
  console.log(items[0].amount)
  return items[0].amount;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  const { currency } = req.body;
try {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: currency,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
} catch (error) {
  res.send({
    error: error.message,
  });
}
  
});

app.get("/greet", async (req, res) => {
	res.send('hello, its working');
});
const PORT = process.env.PORT || 5001;
app.listen(PORT,() => console.log(`Node server listening on port ${PORT}`));
