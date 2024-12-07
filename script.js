document.addEventListener('DOMContentLoaded', (event) => {
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

    const itemInput = document.getElementById('itemInput');
    const priceInput = document.getElementById('priceInput');
    const addButton = document.getElementById('addButton');
    const shoppingListElement = document.getElementById('shoppingList');
    const clearButton = document.getElementById('clearButton');

    function saveList() {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    }

    function renderList() {
        shoppingListElement.innerHTML = '';
        shoppingList.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'shopping-list-item';
            listItem.innerHTML = `
                <span contenteditable="true">${item.name} - $${item.price.toFixed(2)}</span>
                <button class="markPurchasedButton">Mark Purchased</button>
                <button class="deleteButton">Delete</button>
            `;
            if (item.purchased) {
                listItem.classList.add('purchased');
            }

            listItem.querySelector('.markPurchasedButton').addEventListener('click', () => {
                shoppingList[index].purchased = !shoppingList[index].purchased;
                saveList();
                renderList();
            });

            listItem.querySelector('.deleteButton').addEventListener('click', () => {
                shoppingList.splice(index, 1);
                saveList();
                renderList();
            });

            listItem.querySelector('span').addEventListener('input', (e) => {
                const [name, price] = e.target.textContent.split(' - $');
                shoppingList[index].name = name;
                shoppingList[index].price = parseFloat(price);
                saveList();
            });

            shoppingListElement.appendChild(listItem);
        });
    }

    addButton.addEventListener('click', () => {
        const itemName = itemInput.value.trim();
        const itemPrice = parseFloat(priceInput.value);
        if (itemName && !isNaN(itemPrice)) {
            shoppingList.push({ name: itemName, price: itemPrice, purchased: false });
            saveList();
            renderList();
            itemInput.value = '';
            priceInput.value = '';
        }
    });

    clearButton.addEventListener('click', () => {
        shoppingList = [];
        saveList();
        renderList();
    });

    renderList();
});
