import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUBLISHABLE_KEY = 'pk_test_51LiDGbFg81ZI8QTBYr0c97djaAJ8Bnq9jPoxjEQPKbZNwRrUNVcX9Q8BWa1gW1czpo7wmAITg0dgDNvDuuvM3amN00lchteQ6w'

export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)