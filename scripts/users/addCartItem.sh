#!/bin/bash
# API="https://thawing-scrubland-72649.herokuapp.com/"
API="http://localhost:4741"
URL_PATH="/add-cart-item"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "item": {
      "product": "'"${PRODUCT}"'",
      "qty": "'"${QTY}"'"
    }
  }'

echo
