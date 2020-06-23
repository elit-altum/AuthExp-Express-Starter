# Express Starter With User Authentication

***A simple, intuitive and ready to use MVC express starter with user authentication handled for you.***

*Highly customizable to suit your needs. Can be extended to a REST API or to a full fledged server/client side rendering webapp.*

<p>
  <img src="https://img.shields.io/badge/backend-NodeJS-darkgreen?style=flat&logo=Node.js" />
  <img src="https://img.shields.io/badge/framework-ExpressJS-green" />
  <img src="https://img.shields.io/badge/authentication-JSON Web Tokens-purple?logo=json-web-tokens" />
  <img src="https://img.shields.io/badge/database-MongoDB-yellow?logo=MongoDB" />
  <img src="https://img.shields.io/badge/package--manager-npm-yellowgreen?logo=npm" />
  <img src="https://img.shields.io/badge/architecture-MVC-red" />
</p>

<p>
  <img src="https://img.shields.io/badge/made--by-elit--altum-blue?style=flat" />
</p>

## 01. BASICS
1. The MVC architecture splits your application files broadly into 3 components - Models, Views and Controllers.
    - Models: The database schemas or guidelines which control the data being stored in the database. It is responsible for data validations.
    - Controllers: This part of the application can be split into routes and controllers.
      - Routes: The different API endpoints of your http server.
      - Controllers: The functions which would actually handle all requests coming to these endpoints and provide a response.
    - Views: These consist of the frontend of the app. If your app is a server-side-rendering app this would most probably consist of templates/views written in pug, ejs etc.
   - You can read more about the MVC architecture [here](https://www.geeksforgeeks.org/model-view-controllermvc-architecture-for-node-applications/)
  
2. File Structure
    ```
    |
    |-controllers/
    | |- authController.js
    | |- userController.js
    |-models/
    | |- userModel.js
    |-public/
    | |- img/
    | | |- user-profiles/
    | | | |-default.png
    |-routes/
    | |- userRouter.js
    |-utils/
    | |- appError.js
    | |- catchAsync.js
    | |- errorHandler.js
    | |- sendEmails.js.js
    | package.json
    | .gitignore
    | app.js
    | server.js
    ```

## 02. SETUP

1. Create a file ```config.env``` at the root of the directory to store all the secrets or environment variables. [dotenv](https://www.npmjs.com/package/dotenv) is being used to parse these environment variables.
   ```
   NODE_ENV=<development/production>

   APP_NAME=<The name of your app. This is what will appear in the default welcome emails>

   PORT=<The port where you want to server to run. Default: 3000>


   MONGO_SRV=<Your hosted mongoDB Cluster SRV string (For local development use: mongodb://localhost:27017)>


   JWT_SECRET=<A minimum 32 bit string for encrypting and validating JWTs>

   JWT_EXPIRE=<Number of days after which the JWT will expire. Use strings like '7d' for expiry after 7 days>


   COOKIE_EXPIRE=<Number of days after a browser stored cookie should expire. Specify the number of days just like a number like '90' to expire the cookie after 90 days>


   SENDGRID_API_KEY=<Sendgrid issued unique API key to send emails to clients>

   SENDGRID_SENDER_EMAIL=<The sender email which your clients would receive the emails from>

   ```

2. Install all dependencies using npm by running:  ```npm i``` from the root of the directory.

3. Scripts have been provided for easier use.
    - ```npm run dev``` : Starts the server on the specified port using [nodemon](https://www.npmjs.com/package/nodemon). Every save will refresh the server.
    - ```npm start``` : A script which runs the app in production using node. Mostly used for heroku or other hosting platforms after being built there to start the server.

## 03. API DOCUMENTATION