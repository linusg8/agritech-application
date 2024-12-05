const API_URL = 'http://localhost:3000';
const token = localStorage.getItem('token');

if (!token) window.location.href = 'login.html';

document.getElementById('logout')?.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});

async function fetchProducts() {
  const response = await fetch(`${API_URL}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const products = await response.json();

  const productsDiv = document.getElementById('products');
  productsDiv.innerHTML = products.map((p) => `
    <div>
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p>Price: $${p.price}</p>
    </div>
  `).join('');
}

fetchProducts();
