#!/bin/bash

API="http://localhost:4741"
URL_PATH="/products"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "product": {
      "picture_URL": "'"${PICTURE}"'",
      "name": "'"${NAME}"'",
      "description": "'"${DESCR}"'",
      "price": "'"${PRICE}"'"
    }
  }'

echo
