# Shoping-and-To-do-with-server-and-chat
First, I'm doing it with a server and SocketIO for chat to get some expereince with AWS and then I may rebuild a serverless version.
I'm using react native stack navigator as I haven't used that particular navigator, similarly I'm using vector icons to eperience that icon set.
Uses login.trim - which removes leading or trailing spaces - to disallow empty login, and display message using Alert.
Uses userContext to store username for access throughout the app (could use async storage or similar) (initially a least for this demo app no security is added to log in, no password required)
Uses CORS to allow communication between different domains
uses express to set up a server (initially on 4000) to feed Socket.io connection.
I'm using useLayoutEffect which works before a re-render, this is known to cause performance issues but probably fine for a smaller app. (Can refactor to useEffect here in the future, if performance is an issue)


# functionality
items added to lists are atracked by frequency of use and filtered by frequency so most used apear at top of list

ToDo's are displayed on a modal, so the link to socket.io for sharing is in the ShowModal.js
ShoppingList is not displayed on a modal.


