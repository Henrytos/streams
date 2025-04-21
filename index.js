async function getProducts() {
    const response = await fetch("http://localhost:3000/products");
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
            <td>${product.description}</td>
            <td>${product.price_in_cents}</td>
        `;
        tableBody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const products = await getProducts();
    renderProductsInTable(products);
});

document.getElementById("button-download-csv").addEventListener("click", async () => {                      
    const response = await fetch("http://localhost:3000/products/download");
    const {fileUrl} = await response.json();
    
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = fileUrl;
    a.download = "products.csv";
    document.body.appendChild(a);
    a.click();
});