# Express Starter With User Authentication 🔐

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

***✔️ A simple, intuitive and ready to use MVC express starter with user authentication handled for you.***

*✔️ Highly customizable to suit your needs. Can be extended to a REST API or to a full fledged server/client side rendering webapp.*

## 00. CONTENTS 📃
  - [BASICS](#01-basics-⚙️)
  - [SETUP](#02-setup-🏗️)
  - [AUTHENTICATION MIDDLEWARES](#03-authentication-middlewares-🔑)
  - [API DOCUMENTATION](#04-api-documentation-📝)
    - [Basics](#a-basics)
    - [User Signup](#b-user-signup)
    - [User Login](#c-user-login)
    - [User Logout](#d-user-logout)
    - [Forgot Password](#e-forgot-password)
    - [Reset Password](#f-reset-password)
    - [User Details](#g-user-details)
    - [Update User](#h-update-user)
    - [Update Password](#i-update-password)
    - [Delete/Deactivate User](#j-deletedeactivate-user)
    - [Delete User](#k-delete-user)

## 01. BASICS ⚙️
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

## 02. SETUP 🏗️

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

## 03. AUTHENTICATION MIDDLEWARES 🔑
Two very important and versatile middlewares have been provided in ```authController.js``` to implement user authentication and authorization for any future endpoints.

  1. User Authentication 
       - To only allow authenticated users to access some endpoints please import and use ```protectRoute``` from ```authController.js``` before the actual endpoint. If a user is not validated a ```401 - Unauthorized``` error is returned.<br/>
       Snippet:
          ```JS
          const authController = require('../controllers/authController.js')

          app.use(authController.protectRoute)

          // All routes herein are now protected
          
          app.get('/protectedRoute', (req, res) => {
            // Controller Logic
          });
          ``` 

  2. User Authorization 
      - To only allow admins to access some endpoints please import and use ```restrictTo``` from ```authController.js``` before the actual endpoint. If a user is not validated a ```403 - Forbidden``` error is returned.
      - Pass the roles which you want to allow to access the endpoint as the argument to this function. Role of a user is specified in his database document as the ```role``` property.
      - **NOTE**: Only use this middleware *after* the ```protectRoute```.<br/> 
      Snippet:  
        ```JS
        const authController = require('../controllers/authController.js')

        app.use(authController.protectRoute)
        app.use(authController.restrictTo('admin'))

        // All routes herein are now protected and can only be accessed by admins.
        
        app.get('/adminRoute', (req, res) => {
          // Controller Logic
        });
        ``` 

## 04. API DOCUMENTATION 📝

### A. Basics
1. Routes are of two types ***Protected*** and ***Open***.
   - **Protected**: These routes require a valid server issued JWT either as a request header or a cookie sent along with the request. The request header should have the format:
      ```
      {
        Authorization: Bearer <JWT>
      }
      ```
    - **Open**: These routes can be accessed by both authenticated and non authenticated users and do not require any special configuration.
2. Every user can be specified some roles, they can be either ```admin``` or ```user```. By default every user document will have the role of ```user```. For creating an admin, please change their ```role``` on the database document itself.
  
### B. User Signup
*Open Route*

POST */api/v1/users/signup*

- Sign up new users for the application and store relevant information in the database.
  
**Request**
```json
{
	"username": "my-username", 
	"name": "my-name", 
	"password": "my-password", 
	"passwordConfirm": "my-password", 
	"email": "my-name@domain.com" 
}
```

**Response**
```json
{
    "status": "success",
    "data": {
        "token": "<Server issued JWT>",
        "user": {
            "photo": "/img/user-profiles/default.png",
            "role": "user",
            "isActive": true,
            "_id": "5ef1c77cf6b4030dc0a258c3",
            "username": "my-username",
            "name": "my-name",
            "email": "my-name@domain.com",
            "createdAt": "2020-06-23T09:12:28.107Z",
            "updatedAt": "2020-06-23T09:12:28.107Z",
            "__v": 0,
            "id": "5ef1c77cf6b4030dc0a258c3"
        }
    }
}
```

**Notes**
  1. Validators: 
     - Username: Should be unique in the database.
     - Email: Should be unique in the database. It should comply with the format ```some@domain.com```
     - Password: Minimum length of 8 characters.
     - PasswordConfirm: Minimum length of 8 characters and should be same as Password.
  2. Result
     - Upon validation, a server issued JWT will be returned in plain text as well as a cookie along with the server response. The cookie is automatically stored in the browser and the plain text JWT maybe used for setting future request headers for authentication.
     - A welcome email would be sent to the registered email id via SendGrid.
     - The ```photo``` property in the response holds a relative URL to the ```default.png``` user profile in the server. This can be directly used as
        ```html
        <img src={res.data.user.photo} />
        OR
        <img src="/img/user-profiles/default.png">
        ```

### C. User Login
*Open Route*

POST */api/v1/users/login*

- Login existing users by username and password and issue a JWT. 
  
**Request**
```json
{
	"username": "my-username", 
	"password": "my-password", 
}
```

**Response**
```json
{
    "status": "success",
    "data": {
        "token": "<Server issued JWT>",
        "user": {
            "photo": "/img/user-profiles/default.png",
            "role": "user",
            "isActive": true,
            "_id": "5ef1c77cf6b4030dc0a258c3",
            "username": "my-username",
            "name": "my-name",
            "email": "my-name@domain.com",
            "createdAt": "2020-06-23T09:12:28.107Z",
            "updatedAt": "2020-06-23T09:12:28.107Z",
            "__v": 0,
            "id": "5ef1c77cf6b4030dc0a258c3"
        }
    }
}
```

**Notes**
  1. Validators: 
     - Username and Password should match correctly with the stored document in the database.
  2. Result
      - Upon validation, a server issued JWT will be returned in plain text as well as a cookie along with the server response. The cookie is automatically stored in the browser and the plain text JWT maybe used for setting future request headers for authentication.

### D. User Logout
*Protected Route*

GET */api/v1/users/logout*

- Logout users from the application and replace their JWTs for no further access to protected routes. 

**Response**
```json
{
    "status": "success"
}
```

**Notes**
  1. Validators: 
     - Can only be performed if the client is authenticated.
  2. Result
     - Upon validation, the server issued JWT stored as a cookie will be replaced by some garbage text. This cookie will then expire in 5 seconds.
     - User would have to login again to access any protected routes.

### E. Forgot Password
*Open Route*

POST */api/v1/users/forgotPassword*

- Send an email with password reset details to a registered email id. 
  
**Request**
```json
{
	"email": "my-name@domain.com" 
}
```

**Response**
```json
{
    "status": "success",
    "message": "An email with password reset instructions has been sent to my-name@domain.com"
}
```

**Notes**
  1. Validators: 
     - The email should comply with the format ```some@domain.com``` and should be registered by a user in the database.
  2. Result
      - Upon validation, a server issued token for resetting password will be sent to the specified email. Example: 
        > We have received a password reset request from this email id. Please use this link to provide a new password.
        *Reset Password*

      - The 'Reset Password' will link to a url of the form: <br/>
       ```http://<app-url>/api/v1/users/resetPassword/<some-token>```
      - The URL will only be valid for 15 minutes after its creation.

### F. Reset Password
*Open Route*

PATCH */api/v1/users/resetPassword/some-token*

- Reset your password, if forgotten, by using this generated link sent to your email id. 
  
**Request**
```json
{
	"password": "new-password",
	"passwordConfirm": "new-password"
}
```

**Response**
```json
{
    "status": "success",
    "data": {
        "token": "<Server issued JWT>",
        "user": {
            "photo": "/img/user-profiles/default.png",
            "role": "user",
            "isActive": true,
            "_id": "5ef1c77cf6b4030dc0a258c3",
            "username": "my-username",
            "name": "my-name",
            "email": "my-name@domain.com",
            "createdAt": "2020-06-23T13:03:33.737Z",
            "updatedAt": "2020-06-23T13:12:23.286Z",
            "__v": 0,
            "id": "5ef1c77cf6b4030dc0a258c3"
        }
    }
}
```

**Notes**
  1. Validators: 
     - The password should have at least 8 characters and match perfectly with passwordConfirm.
  2. Result
      - Upon validation, a server issued JWT will be returned in plain text as well as a cookie along with the server response. The cookie is automatically stored in the browser and the plain text JWT maybe used for setting future request headers for authentication. 
      - **NOTE**: This operation will make all other JWTs issued to this user as invalid. The user would have to login again with the new credentials.


### G. User Details
*Protected Route*

GET */api/v1/users/me*

- Shows the details of the current user. 

**Response**
```json
{
    "status": "success",
    "data": {
        "user": {
            "photo": "/img/user-profiles/default.png",
            "role": "user",
            "isActive": true,
            "_id": "5ef1c77cf6b4030dc0a258c3",
            "username": "my-username",
            "name": "my-name",
            "email": "my-name@domain.com",
            "createdAt": "2020-06-23T09:12:28.107Z",
            "updatedAt": "2020-06-23T09:12:28.107Z",
            "id": "5ef1c77cf6b4030dc0a258c3"
        }
    }
}
```

### H. Update User
*Protected Route*

PATCH */api/v1/users/updateMe*

- Update the current user details (non-sensitive details only)
- Do not use this route for updating passwords. 
  
**Request**

 Multi-part/Form data consisting of: 

```
{
  name: String,
  username: String,
  email: String,
  photo: File (images/*)
}
```

**Response**

Updated data is sent as the server response:
```json
{
    "status": "success",
    "data": {
        "user": {
            "photo": "/img/user-profiles/default.png",
            "role": "user",
            "isActive": true,
            "_id": "5ef1c77cf6b4030dc0a258c3",
            "username": "my-username2",
            "name": "my-name",
            "email": "my-name@domain.com",
            "createdAt": "2020-06-23T13:03:33.737Z",
            "updatedAt": "2020-06-23T13:12:23.286Z",
            "__v": 0,
            "id": "5ef1c77cf6b4030dc0a258c3"
        }
    }
}
```

**Notes**
  1. Validators: 
     - Same as [User Signup](#b.-user-signup)
  2. Result
      - This operation will return an error if an attempt is made to update the password using this route.
      - The photo to be uploaded should satisfy:
        - MIME: ```images/*```
        - File Size: Not more than 5MB
        - The dimensions of the photo will be cropped to ```500x500``` from the center before uploading.
  
### I. Update Password
*Protected Route*

PATCH */api/v1/users/updatePassword*

- Update the current user password.
  
**Request**
```json
{
	"oldPassword": "my-password",
	"newPassword": "new-password",
	"confirmPassword": "new-password"
}
```

**Response**
```json
{
    "status": "success",
    "message": "Password changed successfully."
}
```

**Notes**
  1. Validators: 
     - Same as [Reset Password](#f.-reset-password)
     - The oldPassword field should have the current user password before updating it to ensure no one else can change the password.
  2. Result
      - **NOTE**: This operation will make all other JWTs issued to this user as invalid. The user would have to login again with the new credentials.
  
### J. Delete/Deactivate User
*Protected Route*

DELETE */api/v1/users/deleteMe*

- Allow a user to delete themselves from the database.
- A pseudo operation. This operation only sets a user's ```isActive``` field as ```false```.
  
**Response**
- A ```204``` status code.

**Notes**
  1. Result
      - **NOTE**: This operation will just mark the user as inactive. If you wish to delete a user from the database, either modify this operation or use [Delete User](#k.-delete-user)

### K. Delete User
*Protected Route*
<br/>
*Admin Only*

DELETE */api/v1/users/deleteUser/user-id*

- Actually deletes the user document from the database.
  
**Response**
- A ```204``` status code.




