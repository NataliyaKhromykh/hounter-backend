const express = require('express');
const app = express();
require("dotenv").config();

const mongoose = require('mongoose');
const routes = require('./QuestionsRoutes');
const cors = require('cors');

require('dotenv').config();
mongoose.set("strictQuery", false);

const PORT = 4000 || process.env.port
app.use(express.json())
app.use(cors())
mongoose
.connect(process.env.MONGODB_LINK)
.then(()=> console.log(`we were connected to MONGO`))
.catch((err) => console.log(err))

app.use(routes);

app.listen(PORT, () =>{
    console.log(`I'm listening on port ${PORT}`)
})


const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/stripe/charge", cors(), async (req, res) => {
  console.log("stripe-routes.js 9 | route reached", req.body);
  let { amount, id } = req.body;
  console.log("stripe-routes.js 10 | amount and id", amount, id);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "Hounter",
      payment_method: id,
      return_url: 'https://example.com/return_url',
      confirm: true,
    });
    console.log("stripe-routes.js 19 | payment", payment);
    res.json({
      message: "Payment Successful",
      success: true,
    });
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server started...");
});

