# HungryNinjas

Kitchen App 2.0

PRD: Product Requirement Document

Engineering Requirement Specification

Topics to be covered:

Brief Description : Kitchen Inventory Application (Hungry Ninjas MERN Application). A website that displays the current kitchen inventory and allows your to request new items.

MVP (Minimum Viable Product):

## Login and Registration

- [x] Users can view the homepage without being logged in.
- [x] If a user wants to change the quantity (add or remove), add item, review an item, or like an item present a message to request the user to create an account or login.
      Registration:
- [x] First Name: Validation 2 letters
- [x] Last Name: Validation 2 letters
- [x] Email : Valid Email Address
- [x] Password: atleast 8 characters
      Login:
- [x] Email: Valid Email Addres
- [x] Password:

## Home Page : Title: Hungry Ninjas

- [x] Section : In Stock :
- [x] In a card layout per item show all items in stock and show the current quantity # for the item.
- [x] If a user clicks on a item card, this will route to a single item page that will show the item a brief description, quantity, a plus to add quantity, a negative to reduce quantity.
- [x] A like button and display quantity of likes to show how popular the item is.
- [x] Add a link to return to the homepage and logout.
- [x] Display items by largest quantity and scroll through item cards.
- [x] If an item is out of stock ( 0 quantity) gray out the item card.  
       b) Section : Requested Items
- [x] Show all requested items and scroll through requested items.

## Request Item Link on Homepage

- [x] Link to requested item
- [x] Item Name:
- [x] Image URL:

## Database

User

- [x] User_ID
- [x] FirstName
- [x] LastName
- [x] Email
- [x] Password

Items

- [x] ItemName
- [x] ItemQuantity
- [x] Likes
