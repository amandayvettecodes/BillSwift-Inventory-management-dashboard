const form = document.getElementById('inventory-form');
const nameInput = document.getElementById('name');
const quantityInput = document.getElementById('quantity');
const thresholdInput = document.getElementById('threshold');
const tableBody = document.getElementById('inventory-body');

let items = JSON.parse(localStorage.getItem('inventory')) || [];

function saveAndRender() {
  localStorage.setItem('inventory', JSON.stringify(items));
  renderTable();
}

function renderTable() {
  tableBody.innerHTML = '';
  items.forEach((item, index) => {
    const row = document.createElement('tr');
    const lowStock = parseInt(item.quantity) <= parseInt(item.threshold);

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td class="${lowStock ? 'low-stock' : ''}">${lowStock ? 'Low Stock' : 'OK'}</td>
      <td>
        <button onclick="deleteItem(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newItem = {
    name: nameInput.value,
    quantity: quantityInput.value,
    threshold: thresholdInput.value
  };
  items.push(newItem);
  saveAndRender();
  form.reset();
});

function deleteItem(index) {
  items.splice(index, 1);
  saveAndRender();
}

renderTable();
