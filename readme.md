# AJAX CRUD Example

This is a simple demonstration of CRUD (Create, Read, Update, Delete) operations using AJAX (Asynchronous JavaScript and XML) with localStorage as the storage mechanism. The application allows you to add, update, and delete items dynamically without requiring a backend server.

## Features

- Add new items to the list
- Update existing items in the list
- Delete items from the list

## Technologies Used

- HTML
- CSS
- JavaScript
- AJAX (XMLHttpRequest)
- localStorage

## File Structure

- `index.html`: HTML file containing the structure of the web page.
- `styles.css`: CSS file containing the styles for the web page.
- `script.js`: JavaScript file containing the logic for CRUD operations using AJAX.
- `README.md`: This file containing information about the project.

## Usage

1. Clone the repository to your local machine.
2. Open `index.html` in a web browser.
3. You will see a form to add new items and a list of existing items.
4. To add an item, enter its name in the input field and click the "Add Item" button.
5. To update an item, click the "Edit" button next to the item, enter the new name in the prompt, and press OK.
6. To delete an item, click the "Delete" button next to the item.

## How it Works

- When you submit the form to add a new item, an AJAX request is sent to the server (in this case, `localStorage`) to save the item.
- When you click the "Edit" button, a prompt appears asking for the new name. After entering the new name, an AJAX request is sent to update the item in `localStorage`.
- When you click the "Delete" button, an AJAX request is sent to delete the item from `localStorage`.
- The list of items is updated dynamically after each operation without requiring a page refresh.

## Note

- This example uses `localStorage` for simplicity. In a real-world scenario, you would replace `localStorage` with a backend server to handle CRUD operations.
- Ensure that your browser supports `localStorage`. 

