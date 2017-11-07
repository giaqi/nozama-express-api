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

# TOKEN=l9PoNB+JSN2AcPvrS3+/0tzx9gAbYhySfvDVMvjiOYc=--Ge8Vw7aH3qieWF24l7s+Zvjg9RBi9ERn7F/0xiWrLsE= PRODUCT={"_id":"5a0131e5b6f72224ae898ca6","updatedAt":"2017-11-07T04:09:09.502Z","createdAt":"2017-11-07T04:09:09.502Z","picture_URL":"http://www.google.com/","name":"test","description":"test","price":3.5,"_owner":"5a012dd86637f524107fa75e","__v":0,"id":"5a0131e5b6f72224ae898ca6","editable":false} QTY=2 ID=5a012dd86637f524107fa75e sh scripts/users/add-cart-item.sh
