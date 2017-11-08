curl https://api.stripe.com/v1/charges \
   -u sk_test_qYebBMofUkr3zAn2p5E6NYvP: \
   -d amount=1000 \
   -d currency=usd \
   -d description="Example charge" \
   -d source=tok_visa
