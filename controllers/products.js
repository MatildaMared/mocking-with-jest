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
	try {
		if (typeof searchString !== "string") {
			throw new Error("argument must be of type string");
		}
		const products = await collection("products").filter(
			searchString.trim().toLowerCase()
		);
		if (products.length === 0) {
			return undefined;
		}
		return products;
	} catch (exception) {
		throw new Error(exception);
	}
}

// Returns a single product based on its id
async function getProductById(id) {
	const product = await collection("products").getById(1);
	return product;
}

// //: void  // drar ifrån 1 av den valda produkten från lagret
// function buyProduct(id) {}

// // lägger till en ny produkt
// function addProduct(newProduct) {}

// // ändrar en produkt genom att byta ut den
// function modifyProduct(id, updatedProduct) {}

// // tar bort en produkt från lagret
// function deleteProduct(id) {}

module.exports = { getProducts, getProductById };
