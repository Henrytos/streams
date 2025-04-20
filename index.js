async function getProducts() {
    const response = await fetch("https://localhost:3000/products");
    const data = await response.json();
    const products = data.products;

    return products;
}

function renderProductsInTable(products) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Clear existing rows

    products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
        `;
        tableBody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const products = await getProducts();
    renderProductsInTable(products);
});