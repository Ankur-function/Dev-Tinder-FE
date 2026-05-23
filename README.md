# DevTinder

- Created a Vite + React application
- Remove unnecassary code and create a Hello World app
- Install Tailwind css
- Install Daisy UI
- Add Navbar component to App.jsx
- Create NavBar in a Separate Components folders
- Install react-router-dom
- Create BrowserRouter  > Routes  > Route=/Body  > RouteChildren
- Create an Outlet in your Body Component
- Create a footer
- Create a Login Page
- Install axios
- CORS - in backend - install cors and add middleware with configuration with origin and credentials:true.
- CORS - in frontend - Whenever you are making an API call using axios pass => {withCredentials: true}
- Install Redux Toolkit and react-redux
- Configure appStore and it's Slices etc.
- Login and see if your data is coming properly in the store.
- NavBar should update as soon as user login
- Refactor the code to add constants file
- You should not be accessing other routes without login
- If token is not present redirect user to login page
- Logout feature
- Get the feed and add the feed in the store
- Build the user card on the feed
- Edit profile feature
- Show Toast Message on save profile
- New page to see all my connected requests
- New page to see all my received requests
- Feature :- Accept/Reject Received requests
- Feature :- Send Interest/Ignored on Feed page

# Razorpay Payment Gateway Integration

- Sign Up on Razorpay and complete KYC
- Created an UI for premium page
- Creating an API for Create Order
- Added my key and secret in env file
- Initialze Razorpay in utils
- Creating order on Razorpay
- Create schema and model
- Saved the order in payments collection
- Make the API dynamic
- Setup Razorpay webhook on your live api

# Real Time Chat Using Websocket(Socket.io)

    Socket.io is a library that enables low-latency, bidirectional and event-based communication between a client and a server. 

- Build the UI for Chat Window on chat/:targetUserId

- Setup socket.io in backend
- Setup socket.io in frontend
- Intialize the chat
- createSocketConnection




// Homework feature :- 

1) Build on Online/Offline feature on connections and chat page(green/red dot). and also include last seen 2 hours ago/5 min ago etc.

2) chat messages can grow very large and currently i am fetching all messages at once. which can slow down our UI,so instead limit 
    fetching the messages from database. and build pagination type of feature like when we scroll up loads only 10 messages at a time.

# Project ideas :-

1) Build Chess games
2) Build Tic Tac Toe game
3) Build TypeRacer type of game using websockets. (this is very interesting).