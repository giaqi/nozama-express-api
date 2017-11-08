#!/bin/bash

API="http://localhost:4741"
URL_PATH="/purchases"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
      "stripeInvoice": "'"${INVOICE}"'",
      "stripeTransaction": "'"${TRANSACTION}"'"
    }'

echo
