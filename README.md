### Backend command
node index.js

Runs on port no 3004


### Frontend command
npm start

Please use 3000 port

## covered 

1 Login 
2 Signup
3 User information save to database
4 Add form data with aurinko api and save to database
5 Show all latest booking details 
6 Creating calendar
7 All list of calendars

### apis used 


## All aurinko apis integrate in backend 
This is why because of some data we have to save into our database from Aurinko


# Aurinko Authantication with - google Oauth
<!-- https://api.aurinko.io/v1/auth/authorize?clientId=${process.env.REACT_APP_AURINKO_CLIENT_ID}&serviceType=Google&serviceType=Google&scopes=Calendar.ReadWrite Mail.Read Mail.Send&responseType=code&returnUrl=${process.env.REACT_APP_REDIRECT_URL} -->
- Url used which return code in returnUrl after authantication.

- I also use this on backend but it return html in response which is not working

- redirect url is - http://localhost:3000


### aurinko api's used in backend 

covered all the api's in backend not directly used it to frontend because we also have to save data in our local database - account Info , booking details

# callback api - post
<!-- http://localhost:3004/callback -->
used for code which is given by Aurinko to generate token from aurinko apis.

# to get account info through token - post
<!-- http://localhost:3004/userInfo -->
this api gives user information by which we save data to our database  .

# booking form api - post/get

<!-- http://localhost:3004/createBooking  --> 

<!-- http://localhost:3004/getAllBookingList -->

   After submit form data comes in response from aurinko will saved to our database automatically.


# Calendar api's - post/get
used this apis to create calendar and get all lists of calander
<!-- http://localhost:3004/calendar -->
<!-- http://localhost:3004/calendars/:pageToken -->



### database 
runs on default port: 2017

name - Aurinko

## Models to store data
1 users 
2 bookings


### process we follow of aurinko
- Direct hit the aurinko url for authantication which return code in return url

- setup /auth/token aurinko api in backend to return token from the given code 

- setup /account aurinko api to get user information from the token 

- setup book/profiles aurinko api to create booking profile by Aurinko and also use local    get api to get list of booking latest at the top

- Response comes from book/profiles api we save to our database

- setup v1/calendars aurinko api to create calander

- setup v1/calendars aurinko api to get all lists of calander


### steps follow in configuration outside of the code, google auth, callback
- Setup Aurinko account create project from aurinko dashboard page

- Setup Google Oauth from Google developer console - https://console.cloud.google.com/apis/dashboard?pli=1   and add aurinko Redirect uri set in one of authorized redirect uri in [credentials]

- Enable many scopes from google console Oauth consent screen like - mail.read, mail.write,calendar.read,calander.write,mail.send,profile etc 

- Configure Google Oauth in Aurinko from aurinko project setting page Client Id and Client Secret provided by Google Oauth

- Add uri http://localhost:3000 in Aurinko setting>callback 








