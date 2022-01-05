const { collection } = require("../database");

// Product {
//     id: string;
//     name: string;
//     details: string;  // längre beskrivning av produkten
//     price: number;
//     inStock: number;  // antal kvar i lager
//     image?: string;   // bild-URL, valfri
// }

// Returns array of products where the product name matches the search string
async function getProducts(searchString) {
	if (typeof searchString !== "string") {
		throw new Error("Error: Argument must be of type string");
	}
	const products = await collection("products").filter(
		searchString.trim().toLowerCase()
	);
	if (products.length === 0) {
		return undefined;
	}
	return products;
}

// Returns a single product based on its id
async function getProductById(id) {
	if (typeof id !== "string") {
		throw new Error("Error: Invalid id");
	}

	const product = await collection("products").getById(id);

	if (!product) {
		return undefined;
	}

	return product;
}

// //: void  // drar ifrån 1 av den valda produkten från lagret
// function buyProduct(id) {}
async function buyProduct(id) {
	if (typeof id !== "string") {
		throw new Error("Error: Invalid id");
	}

	const product = await collection("products").getById(id);

	if (!product) {
		throw new Error("Error: No product matching the id");
	}

	const updatedProduct = { ...product, inStock: product.inStock - 1 };

	await collection("products").updateById(id, updatedProduct);
}

// // lägger till en ny produkt
// function addProduct(newProduct) {}

// // ändrar en produkt genom att byta ut den
// function modifyProduct(id, updatedProduct) {}

// // tar bort en produkt från lagret
// function deleteProduct(id) {}

module.exports = { getProducts, getProductById, buyProduct };
