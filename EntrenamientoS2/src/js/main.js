// Index used to track which product is being edited
let editingIndex = null;
// Array to store all products for the current session/user
let productsAll = [];
// Adds a new product to the productsAll array
function addProduct() {
    let nameProduc = document.getElementById("nameProduct").value;
    let priceProduc = document.getElementById("priceProduct").value;
    let cateProduc = document.getElementById("cateProduct").value;
    let cantProduc = document.getElementById("cantProduct").value;
    // Input validation
    if (nameProduc === "" || priceProduc <= 0 || cateProduc === "" || cantProduc <= 0) {
        alert("Error ingresando datos");
        return;
    }
    // Create a new product object
    let productObj = {
        nombre: nameProduc,
        precio: Number(priceProduc),
        categoria: cateProduc,
        cantidad: Number(cantProduc),
    };
     // Add product to the list
    productsAll.push(productObj);
    renderProductsTable();
    // Clear form inputs
    document.getElementById("nameProduct").value = "";
    document.getElementById("priceProduct").value = "";
    document.getElementById("cateProduct").value = "";
    document.getElementById("cantProduct").value = "";
}
// Saves changes to an existing product after editing
function saveProductChanges() {
    let nameProduc = document.getElementById("nameProduct").value;
    let priceProduc = document.getElementById("priceProduct").value;
    let cateProduc = document.getElementById("cateProduct").value;
    let cantProduc = document.getElementById("cantProduct").value;
    // Input validation
    if (nameProduc === "" || priceProduc <= 0 || cateProduc === "" || cantProduc <= 0) {
        alert("Error ingresando datos");
        return;
    }
    // Update product in array
    productsAll[editingIndex] = {
        nombre: nameProduc,
        precio: Number(priceProduc),
        categoria: cateProduc,
        cantidad: Number(cantProduc),
    };
    editingIndex = null;
    // Reset button to "ADD" mode
    let addBtn = document.querySelector(".btn1-2");
    addBtn.textContent = "AÑADIR";
    addBtn.onclick = addProduct;
    renderProductsTable();
    // Clear form inputs
    document.getElementById("nameProduct").value = "";
    document.getElementById("priceProduct").value = "";
    document.getElementById("cateProduct").value = "";
    document.getElementById("cantProduct").value = "";
}
// Handles user login by checking localStorage for saved inventory
function loginUser() {
    let user = document.getElementById("user").value.trim();
    if (user === "") {
        alert("Por favor ingresa un usuario válido");
        return;
    }
    let savedProducts = localStorage.getItem(user);
    if (!savedProducts) {
        alert(`No se encontró inventario para el usuario: ${user}`);
        productsAll = [];
        renderProductsTable(); // Clear the table if no data
        return;
    }
    // Load the saved inventory for the user
    productsAll = JSON.parse(savedProducts)
    renderProductsTable();
}
// Load product data into the form for editing
function editProduct(index) {
    let product = productsAll[index];
    document.getElementById("nameProduct").value = product.nombre;
    document.getElementById("priceProduct").value = product.precio;
    document.getElementById("cateProduct").value = product.categoria;
    document.getElementById("cantProduct").value = product.cantidad;
    editingIndex = index;
    // Change button to "SAVE CHANGES" mode
    let addBtn = document.querySelector(".btn1-2");
    addBtn.textContent = "GUARDAR CAMBIOS";
    addBtn.onclick = saveProductChanges;
}
// Deletes a product from the array and updates the table
function deleteProduct(index) {
    if (confirm("¿Seguro que quieres eliminar este producto?")) {
        productsAll.splice(index, 1);
        renderProductsTable();
    }
}
// Saves the current inventory to localStorage under the current user's name
function stats() {
    let user2 = document.getElementById("user").value;
        let userName = document.getElementById("user").value;
        const buton = document.getElementById("btn1");
        buton.disabled = false;
        // Convert products array to JSON string and save
        let string = JSON.stringify(productsAll);
        localStorage.setItem(userName, string);
}
// Displays a table with total values of inventories for all users
function userSee() {
    let userPrice = document.getElementById("userPrice");
    userPrice.innerHTML = "";
    let length = localStorage.length;
    for (let i = 0; i < length; i++) {
        let userKey = localStorage.key(i);
        let products = JSON.parse(localStorage.getItem(userKey));
        if (Array.isArray(products)) {
            for (let product of products) {
                let total = product.precio * product.cantidad;
                let insert = `
                    <tr>
                    <td>${userKey}</td>
                    <td>${total}</td>
                    </tr>
                `;
                userPrice.innerHTML += insert;
                console.log(`Total para ${product.nombre} del usuario ${userKey}: ${total}`)
            }
        }
    }
}
// Renders the product list in the table
function renderProductsTable() {
    let table = document.getElementById("products");
    table.innerHTML = ""
    productsAll.forEach((product, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${product.nombre}</td>
        <td>${product.precio}</td>
        <td>${product.categoria}</td>
        <td>${product.cantidad}</td>
        <td class="btns1-2">
        <button class="btn1-5" onclick="editProduct(${index})">EDITAR</button>
        <button class="btn1-5" onclick="deleteProduct(${index})">ELIMINAR</button>
        </td>
    `;
        table.appendChild(tr);
    });
}
stats()
// Call this on load to show data for all users
userSee();