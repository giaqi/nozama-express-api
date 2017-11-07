# What is "Nozama"?
"Nozama" is an eCommerce application designed by Hilary Brown, Brian DiStefano, Rachel Jagodowski and Jeff Keilman. It's an app where customers can browse and purchase items from a selection of products.  Purchasing is really easy!  Users can just browse through the items and only need to create an account when they want to add items to their cart.  Any completed purchases are saved in each customer's purchase history which can be conveniently accessed.



# Links

[Nozama Deployed Client](https://giaqi.github.io/nozama-front-end/)
[Nozama Front-End Repository](https://github.com/giaqi/nozama-front-end)
[Nozama Deployed API](https://thawing-scrubland-72649.herokuapp.com/)

# Technologies Used

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Mongoose](http://mongoosejs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Stripe API](https://stripe.com/docs/checkout)

# ERD
[Original ERD](Team-ERD-Diag.png)

# Planning and Development Strategy


# Future Enhancements and Issue Fixes

# API Endpoints

### Authentication
<table style="width:100%">
  <tr>
    <th>Verb</th>
    <th>URI Pattern</th>
    <th>Controller#Action</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/sign-up</td>
    <td>users#signup</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/sign-in</td>
    <td>users#signin</td>
  </tr>
  <tr>
    <td>PATCH</td>
    <td>/change-password/:id</td>
    <td>users#changepw</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/sign-out/:id</td>
    <td>users#signout</td>
  </tr>
</table>

### Products
<table style="width:100%">
  <tr>
    <th>Verb</th>
    <th>URI Pattern</th>
    <th>Controller#Action</th>
  </tr>
  <tr>
    <td>POST</td>
    <td> </td>
    <td> </td>
  </tr>
  <tr>
    <td>POST</td>
    <td> </td>
    <td> </td>
  </tr>
  <tr>
    <td>PATCH</td>
    <td> </td>
    <td> </td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td> </td>
    <td> </td>
  </tr>
</table>

### Purchases
<table style="width:100%">
  <tr>
    <th>Verb</th>
    <th>URI Pattern</th>
    <th>Controller#Action</th>
  </tr>
  <tr>
    <td>POST</td>
    <td> </td>
    <td> </td>
  </tr>
  <tr>
    <td>POST</td>
    <td> </td>
    <td> </td>
  </tr>
</table>

### Stripe
<table style="width:100%">
  <tr>
    <th>Verb</th>
    <th>URI Pattern</th>
    <th>Controller#Action</th>
  </tr>
  <tr>
    <td>POST</td>
    <td> </td>
    <td> </td>
  </tr>
  <tr>
    <td>POST</td>
    <td> </td>
    <td> </td>
  </tr>
  <tr>
    <td>PATCH</td>
    <td> </td>
    <td> </td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td> </td>
    <td> </td>
  </tr>
</table>
