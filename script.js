let products = [];

//...................................................................

function addProduct() {
  const name = document.getElementById("productName").value;
  const qty = parseInt(document.getElementById("productQty").value);
  const price = parseInt(document.getElementById("productprice").value);
  if (!name || isNaN(qty) || isNaN(price)) {
    alert("Please enter a valid product name and price.");
    return;
  }
  products.push({ name, qty, price });
  saveData();
  renderTable();
  document.getElementById("productName").value = "";
  document.getElementById("productQty").value = "";
  document.getElementById("productprice").value = "";
}

//....................................................................

function updateprice(index){
  const newprice = prompt("Enter new quantity:");
  if (newprice !== null && !isNaN(parseInt(newprice)))
  {products[index].price = parseInt(newprice);
    saveData();
    renderTable();
  }
}

//....................................................................

function deleteProduct(index) {
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(index, 1);
    saveData();
    renderTable();
  }
}

//....................................................................

function renderTable() {
  const tbody = document.querySelector("#inventoryTable tbody");
  tbody.innerHTML = "";
  products.forEach((p, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${p.name}</td>
      
      <td>${p.qty < 10 ? "⚠️ Low Stock" : ""}</td>
      <td>${p.price}</td>
      <td>
        <button class="action-btn" onclick="updateprice(${index})">✏️ Edit PRICE</button>
        <button class="delete-btn" onclick="deleteProduct(${index})">🗑️ Delete</button>
      </td>
    `;
    if (p.qty < 10) row.classList.add("low-stock");
    tbody.appendChild(row);
  });
}
function renderTable() {
  const tbody = document.querySelector("#inventoryTable tbody");
  tbody.innerHTML = "";
  products.forEach((p, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${p.name}</td>
      <td>
        <div class="qty-box">
          <button class="qty-btn minus" onclick="decreaseQty(${index})">➖</button>
          <input type="number" 
                 value="${p.qty}" 
                 min="0" 
                 class="qty-input" 
                 onblur="updateQty(${index}, this.value)" 
                 onkeydown="if(event.key==='Enter'){updateQty(${index}, this.value)}">
          <button class="qty-btn plus" onclick="increaseQty(${index})">➕</button>
        </div>
      </td>
      <td>${p.qty < 10 ? "⚠️ Low Stock" : ""}</td>
      <td>${p.price}</td>
      <td>
        <button class="action-btn" onclick="updateprice(${index})">✏️ Edit PRICE</button>
        <button class="delete-btn" onclick="deleteProduct(${index})">🗑️ Delete</button>
      </td>
    `;
    if (p.qty < 10) row.classList.add("low-stock");
    tbody.appendChild(row);
  });
}


//....................................................................

function searchProduct() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const rows = document.querySelectorAll("#inventoryTable tbody tr");
  rows.forEach(row => {
    const productName = row.cells[1].textContent.toLowerCase();
    row.style.display = productName.includes(query) ? "" : "none";
  });
}

//....................................................................

function saveData() {
  localStorage.setItem("inventory", JSON.stringify(products));
}
function loadData() {
  const data = localStorage.getItem("inventory");
  if (data) {
    products = JSON.parse(data);
    renderTable();
  }
}
window.onload = loadData;

//....................................................................

function increaseQty(index) {
  products[index].qty += 1;
  saveData();
  renderTable();
}

function decreaseQty(index) {
  if (products[index].qty > 0) {
    products[index].qty -= 1;
    saveData();
    renderTable();
  }
}

function updateQty(index, newValue) {
  const newQty = parseInt(newValue);
  if (!isNaN(newQty) && newQty >= 0) {
    products[index].qty = newQty;
    saveData();
    renderTable();
  }
}