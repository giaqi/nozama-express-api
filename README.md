# What is "Nozama"?
"Nozama" is an eCommerce application designed by Team "Git It And Quit It" ([Hilary Brown](https://github.com/hilarybrown), [Brian DiStefano](https://github.com/BrianLM), [Rachel Jagodowski](https://github.com/jago425) and [Jeff Keilman](https://github.com/jeffkeilman)). It's an app where customers can browse and purchase items from a selection of products.  Purchasing is really easy!  Users can just browse through the items and only need to create an account when they want to add items to their cart.  Any completed purchases are saved in each customer's purchase history which can be conveniently accessed.



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
We started out by creating epics, beginning with planning and ending with finishing touches. Feature epics were split by resource functionality and we tasked out the user stories as a team. In order to manage the project, we used PivotalTracker which made it easy for us to move tasks and keep up-to-date on the progress of the project.

The team had two stand-ups a day and programming was always done in pairs. Pair programming was more challenging than we expected because, as it turns out, it's really hard to be the one NOT coding (or at least not physically). It's also hard to work on a project as a team as opposed to individually.

The hardest part of this project for us was the cart. After spending hours on it, we realized we were overthinking it and overcomplicating it. We decided to scrap the cart resource and add the cart as an array to the user resource.

[Nozama Team Sprint Board](https://www.pivotaltracker.com/n/projects/2123553)
# Future Enhancements and Issue Fixes
1.  Add more styling
2.  Add user ratings to products
3.  Enhance search criteria
4.  Add product sub-categories
5.  Enhance purchases to allow "purchase again"
6.  Dynamic tokenization of credit cards
7.  Add ability to save billing information
8.  Make the site more responsive
9.  Items in cart are being sorted by the last updated item

# API Endpoints

### Users
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
  <tr>
    <td>PATCH</td>
    <td>/add-cart-item/:id</td>
    <td>users#addCartItem</td>
  </tr>
  <tr>
    <td>PATCH</td>
    <td>/remove-cart-item/:id</td>
    <td>users#removeCartItem</td>
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
    <td>/products</td>
    <td>products#create</td>
  </tr>
  <tr>
    <td>PATCH</td>
    <td>/products/:id</td>
    <td>/products#update</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/products/:id</td>
    <td>products#show</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/products</td>
    <td>products#index</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/products/:id</td>
    <td>products#destroy</td>
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
    <td>/purchases</td>
    <td>purchases#create</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/purchases</td>
    <td>purchases#index</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/purchases/:id</td>
    <td>/purchases#show</td>
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
    <td>/stripe</td>
    <td>stripe#create</td>
  </tr>
</table>
