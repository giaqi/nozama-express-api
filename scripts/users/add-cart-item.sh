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
    "product": {
      "_id":"5a0131ebb6f72224ae898ca10",
      "updatedAt":"2017-11-07T04:09:15.196Z",
      "createdAt":"2017-11-07T04:09:15.196Z",
      "picture_URL":"http://www.google.com/",
      "name":"test",
      "description":"test",
      "price":3.5,
      "_owner":"5a012dd86637f524107fa75e",
      "__v":0,
      "id":"5a0131ebb6f72224ae898ca10",
      "editable":false
    },
    "qty": "'"${QTY}"'"
  }'

echo

# TOKEN=8FthnMZPw7hDOudQuaEcsT2Yz3kf36DUYTQ2fcv9Pco=--vPtoSxXrMVRGmtPXimUtXQsjeA5QAg/G3JSXk2lGDFs= PRODUCT={"_id":"5a0131ebb6f72224ae898ca7","updatedAt":"2017-11-07T04:09:15.196Z","createdAt":"2017-11-07T04:09:15.196Z","picture_URL":"http://www.google.com/","name":"test","description":"test","price":3.5,"_owner":"5a012dd86637f524107fa75e","__v":0,"id":"5a0131ebb6f72224ae898ca7","editable":false} QTY=2 ID=5a01c76b34e6d235bd2925c5 sh scripts/users/add-cart-item.sh
