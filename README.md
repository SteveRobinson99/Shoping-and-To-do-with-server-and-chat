# Shoping-and-To-do-with-server-and-chat
First, I'm doing it with a server and SocketIO for chat to get some expereince with AWS and then I may rebuild a serverless version.
I'm using react native stack navigator as I haven't used that particular navigator, similarly I'm using vector icons to eperience that icon set.
Uses login.trim - which removes leading or trailing spaces - to disallow empty login, and display message using Alert.
Uses userContext to store username for access throughout the app (could use async storage or similar) (initially a least for this demo app no security is added to log in, no password required)
Uses CORS to allow communication between different domains
uses express to set up a server (initially on 4000) to feed Socket.io connection.


# functionality
items added to lists are atracked by frequency of use and filtered by frequency so most used apear at top of list


