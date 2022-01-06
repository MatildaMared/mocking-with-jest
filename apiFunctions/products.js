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
	try {
		if (typeof id !== "string") {
			throw new Error("Invalid id");
		}

		const product = await collection("products").getById(id);

		if (!product) {
			return undefined;
		}

		return product;
	} catch (exception) {
		throw new Error(exception);
	}
}

// Remove 1 from item stock
async function buyProduct(id) {
	try {
		if (typeof id !== "string") {
			throw new Error("Invalid id");
		}

		const product = await collection("products").getById(id);

		if (!product) {
			throw new Error("No product matching the id");
		}

		const updatedProduct = { ...product, inStock: product.inStock - 1 };

		await collection("products").updateById(id, updatedProduct);

		return updatedProduct;
	} catch (exception) {
		throw new Error(exception);
	}
}

// Add new product to database
async function addProduct(newProduct) {
	try {
		const { name, details, price, inStock, image } = newProduct;
		if (typeof newProduct !== "object") {
			throw new Error("Provided argument must be an object");
		} else if (!name || !details || !price || !inStock || !image) {
			throw new Error(
				"New product object must contain following properties: name, details, price, inStock, image"
			);
		}
		const addedProduct = await collection("products").add(newProduct);
		return addedProduct;
	} catch (exception) {
		throw new Error(exception);
	}
}

// Updates a product
async function modifyProduct(id, productToUpdate) {
	try {
		if (typeof id !== "string") {
			throw new Error("Invalid id");
		} else if (typeof productToUpdate !== "object") {
			throw new Error("Second argument must be of type object");
		}

		const updatedProduct = await collection("products").updateById(
			id,
			productToUpdate
		);

		console.log(updatedProduct);

		if (!updatedProduct) {
			throw new Error("No product matching the id");
		}

		return updatedProduct;
	} catch (exception) {
		throw new Error(exception);
	}
}

// Removes product from database
async function deleteProduct(id) {
	try {
		await collection("products").deleteById(id);
	} catch (exception) {
		throw new Error(exception);
	}
}

module.exports = {
	getProducts,
	getProductById,
	buyProduct,
	addProduct,
	modifyProduct,
	deleteProduct,
};
