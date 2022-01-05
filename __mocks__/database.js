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
	if (db === "products") {
		return {
			getById: () => "mock result",
			filter: (filterString) => {
				return products.filter((product) => {
					return product.name
						.toLowerCase()
						.includes(filterString.toLowerCase());
				});
			},
		};
	}
};

module.exports = { collection };
