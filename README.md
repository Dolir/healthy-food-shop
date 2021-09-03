# Healthy-food-shop
Online store
Color Pic
The Color Pic application uses image recognition to predict what the dominant colors are in a given picture. The colors are then used to generate a suggested color palette with colors that work well together. This works in a semi-random way, so hit regenerate to see a different color set each time.

## User Story:
* User can upload a picture url, capture the main colors, and generate a selected color palette
* User can adjust colors
* User can save palettes for future reference
* User can create a new user profile and login
## [Live demo](https://healthy-food-shop.herokuapp.com/)
![alt text](https://github.com/Dolir/healthy-food-shop/blob/main/client/public/homepage.png "Home page")
![alt text](https://github.com/Dolir/healthy-food-shop/blob/main/client/public/shoppage.png "Shop page")
![alt text](https://github.com/Dolir/healthy-food-shop/blob/main/client/public/itempage.png "Item page")
![alt text](https://github.com/Dolir/healthy-food-shop/blob/main/client/public/cartpage.png "Cart page")
![alt text](https://github.com/Dolir/healthy-food-shop/blob/main/client/public/orderspage.png "Orders page")

## Technology
React, Redux, Stripe, Axios, JWTs, Node.js, Express, MongoDB

## Running locally
* Install dependencies for server ==> npm install
* Install dependencies for client ==> npm run client-install
* Run the client & server with concurrently ==> npm run dev
* Run the Express server only ==> npm run server
* Run the React client only ==> npm run client
* Server runs on http://localhost:5000 and client on http://localhost:3000
## Requirements
* Add mongoURI and jwtSecret to default.json in config folder
