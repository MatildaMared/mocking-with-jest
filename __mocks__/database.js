const products = [
	{
		id: "1",
		name: "Fotboll",
		details: "En boll man kan sparka på",
		price: 120,
		inStock: 20,
		image: "https://jkashdkasjdja.jpg",
	},
	{
		id: "2",
		name: "Basketboll",
		details: "En boll att kasta i en korg",
		price: 310,
		inStock: 15,
		image: "https://hjkdfksjdf.se",
	},
	{
		id: "3",
		name: "Krocketspel",
		details: "Ett härligt spel att spela på sommaren",
		price: 200,
		inStock: 5,
		image: "https://fsdkjfghskdfjghs.se",
	},
	{
		id: "4",
		name: "Innebandyklubba",
		details: "Den bästa klubban för dig och ditt bandylag",
		price: 1500,
		inStock: 3,
		image: "https://ghs.se",
	},
	{
		id: "5",
		name: "Pingisrack",
		details: "Ska du bli bäst på pingis? Då är detta racket för dig.",
		price: 150,
		inStock: 8,
		image: "https://dfsdfdjghs.se",
	},
];

const collection = (db) => {
	// ### PRODUCTS DB FUNCTIONS ###
	if (db === "products") {
		return {
			// Get product by ID
			getById: (id) => {
				return products.find((product) => product.id === id);
			},
			// Get product(s) by search string
			filter: (searchString) => {
				return products.filter((product) => {
					return product.name
						.toLowerCase()
						.includes(searchString.toLowerCase());
				});
			},
			// Add new product to db
			add: (newObj) => {
				const objToAdd = { id: products.length + 1, ...newObj };
				products.push(objToAdd);
				return objToAdd;
			},
			// Replace old product with provided
			updateById: (id, newObj) => {
				const productIndex = products.findIndex((product) => product.id === id);
				if (productIndex === -1) {
					return undefined;
				}
				const newProduct = { ...products[productIndex], ...newObj };

				products[productIndex] = newProduct;
				return newProduct;
			},
			// Delete product based on id
			deleteById: (id) => {},
		};
	}
};

module.exports = { collection };
