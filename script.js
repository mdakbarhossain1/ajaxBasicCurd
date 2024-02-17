// document.addEventListener("DOMContentLoaded", function() {
//     const itemList = document.getElementById('itemList');
//     const addItemForm = document.getElementById('itemForm');
//     const responseDiv = document.getElementById('response');

//     // Function to fetch items from the server
//     function fetchItems() {
//         fetch('http://localhost:3000/items')
//             .then(response => response.json())
//             .then(data => {
//                 itemList.innerHTML = '';
//                 data.forEach(item => {
//                     const li = document.createElement('li');
//                     li.innerHTML = `${item.name} 
//                         <button class="deleteBtn" data-id="${item.id}">Delete</button>
//                         <button class="editBtn" data-id="${item.id}">Edit</button>`;
//                     itemList.appendChild(li);
//                 });
//             })
//             .catch(error => console.error('Error fetching items:', error));
//     }

//     // Function to handle form submission (add item)
//     addItemForm.addEventListener('submit', function(event) {
//         event.preventDefault();
//         const itemName = document.getElementById('itemName').value;
//         fetch('http://localhost:3000/items', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ name: itemName })
//         })
//         .then(() => {
//             fetchItems();
//             responseDiv.textContent = 'Item added successfully.';
//         })
//         .catch(error => console.error('Error adding item:', error));
//     });

//     // Function to handle delete button clicks
//     itemList.addEventListener('click', function(event) {
//         if (event.target.classList.contains('deleteBtn')) {
//             const itemId = event.target.getAttribute('data-id');
//             fetch(`http://localhost:3000/items/${itemId}`, {
//                 method: 'DELETE'
//             })
//             .then(() => {
//                 fetchItems();
//                 responseDiv.textContent = 'Item deleted successfully.';
//             })
//             .catch(error => console.error('Error deleting item:', error));
//         }
//     });

//     // Function to handle edit button clicks
//     itemList.addEventListener('click', function(event) {
//         if (event.target.classList.contains('editBtn')) {
//             const itemId = event.target.getAttribute('data-id');
//             const newName = prompt('Enter the new name:');
//             if (newName) {
//                 fetch(`http://localhost:3000/items/${itemId}`, {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ name: newName })
//                 })
//                 .then(() => {
//                     fetchItems();
//                     responseDiv.textContent = 'Item updated successfully.';
//                 })
//                 .catch(error => console.error('Error updating item:', error));
//             }
//         }
//     });

//     // Fetch items on page load
//     fetchItems();
// });


document.addEventListener("DOMContentLoaded", function() {
    const itemList = document.getElementById('itemList');
    const addItemForm = document.getElementById('itemForm');
    const responseDiv = document.getElementById('response');

    // Function to fetch items from localStorage
    function fetchItems() {
        itemList.innerHTML = '';
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} 
                <button class="deleteBtn" data-id="${item.id}">Delete</button>
                <button class="editBtn" data-id="${item.id}">Edit</button>`;
            itemList.appendChild(li);
        });
    }

    // Function to save items to localStorage
    function saveItems(items) {
        localStorage.setItem('items', JSON.stringify(items));
    }

    // Function to handle form submission (add item)
    addItemForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const itemName = document.getElementById('itemName').value;
        const items = JSON.parse(localStorage.getItem('items')) || [];
        const newItem = {
            id: Date.now(),
            name: itemName
        };
        items.push(newItem);
        saveItems(items);
        fetchItems();
        responseDiv.textContent = 'Item added successfully.';
    });

    // Function to handle delete button clicks
    itemList.addEventListener('click', function(event) {
        if (event.target.classList.contains('deleteBtn')) {
            const itemId = event.target.getAttribute('data-id');
            let items = JSON.parse(localStorage.getItem('items')) || [];
            items = items.filter(item => item.id !== parseInt(itemId));
            saveItems(items);
            fetchItems();
            responseDiv.textContent = 'Item deleted successfully.';
        }
    });

    // Function to handle edit button clicks
    itemList.addEventListener('click', function(event) {
        if (event.target.classList.contains('editBtn')) {
            const itemId = event.target.getAttribute('data-id');
            const newName = prompt('Enter the new name:');
            if (newName) {
                let items = JSON.parse(localStorage.getItem('items')) || [];
                items = items.map(item => {
                    if (item.id === parseInt(itemId)) {
                        item.name = newName;
                    }
                    return item;
                });
                saveItems(items);
                fetchItems();
                responseDiv.textContent = 'Item updated successfully.';
            }
        }
    });

    // Fetch items on page load
    fetchItems();
});
