const express = require("express");
const app = express();
const cors = require('cors');
const { resolve } = require("path");
const dotenv = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
app.use(express.json());
const PORT= process.env.PORT || 4000;
app.use(cors());

app.post("/create-checkout-session", async (req, res) => { // Removed `${PORT}` from the route
    const { items } = req.body;

    const lineItems = [
        {
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Product Name", // Add your product name
                    description: "Product Description", // Add your product description
                },
                unit_amount: 100, // Price in cents (1 dollar = 100 cents)
            },
            quantity: 1,
        },
    ];

    try {
        // Create a Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
