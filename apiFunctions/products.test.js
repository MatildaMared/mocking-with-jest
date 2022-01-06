const {
	getProducts,
	getProductById,
	buyProduct,
	addProduct,
	modifyProduct,
	deleteProduct,
} = require("./products");
const collection = require("../database");
jest.mock("../database");

describe("Products API functions", () => {
	describe("function getProducts", () => {
		it("returns a list of products where product name matches the search string", async () => {
			const searchString = "boll";

			const expectedResult = [
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
			];

			const actualResult = await getProducts(searchString);

			expect(actualResult).toEqual(expectedResult);
		});

		it("returns correct result no matter the combination of upper and lowercase letters", async () => {
			const searchString = "pINGisRACK";

			const expectedResult = [
				{
					id: "5",
					name: "Pingisrack",
					details: "Ska du bli bäst på pingis? Då är detta racket för dig.",
					price: 150,
					inStock: 8,
					image: "https://dfsdfdjghs.se",
				},
			];

			const actualResult = await getProducts(searchString);

			expect(actualResult).toEqual(expectedResult);
		});

		it("returns correct result with trailing or leading whitespace", async () => {
			const searchString = "   innebandyklubba  ";

			const expectedResult = [
				{
					id: "4",
					name: "Innebandyklubba",
					details: "Den bästa klubban för dig och ditt bandylag",
					price: 1500,
					inStock: 3,
					image: "https://ghs.se",
				},
			];

			const actualResult = await getProducts(searchString);

			expect(actualResult).toEqual(expectedResult);
		});

		it("returns undefined if there are no matching products", async () => {
			const searchString = "sdkfjfrurerjkc";

			const expectedResult = undefined;

			const actualResult = await getProducts(searchString);

			expect(actualResult).toBe(expectedResult);
		});

		it("throws an exception if the search string is not of type string", async () => {
			const searchString = {};

			await expect(getProducts(searchString)).rejects.toThrow(
				"Error: Argument must be of type string"
			);
		});
	});

	describe("function getProductById", () => {
		it("returns product object where id matches the id provided in argument", async () => {
			const id = "5";

			const expectedResult = {
				id: "5",
				name: "Pingisrack",
				details: "Ska du bli bäst på pingis? Då är detta racket för dig.",
				price: 150,
				inStock: 8,
				image: "https://dfsdfdjghs.se",
			};

			const actualResult = await getProductById(id);

			expect(actualResult).toEqual(expectedResult);
		});

		it("returns undefined if there is no product matching the id", async () => {
			const id = "invalidId";

			const expectedResult = undefined;

			const actualResult = await getProductById(id);

			expect(actualResult).toBe(expectedResult);
		});

		it("throws an exception if provided id is not of type string", async () => {
			const id = ["1", "2", "3"];

			await expect(getProductById(id)).rejects.toThrow("Error: Invalid id");
		});
	});

	describe("function buyProduct", () => {
		it("reduces the stock of the product that matches the id by 1", async () => {
			const id = "1";
			const productBefore = await getProductById(id);
			const oldStock = productBefore.inStock;

			await buyProduct(id);

			const productAfter = await getProductById(id);

			expect(oldStock - 1).toBe(productAfter.inStock);
		});

		it("throws an exception if provided id is not of type string", async () => {
			const id = null;

			await expect(buyProduct(id)).rejects.toThrow("Error: Invalid id");
		});

		it("throws an exception if no product matches the id", async () => {
			const id = "nonMatchingId";

			await expect(buyProduct(id)).rejects.toThrow(
				"Error: No product matching the id"
			);
		});
	});

	describe("function addProduct", () => {
		it("adds a new product to the database", async () => {
			const productsBefore = await getProducts("");
			const productsBeforeLength = await productsBefore.length;

			const newProduct = {
				name: "Padelracket",
				details: "Med detta racket blir du garanterat en vinnare på padelbanan",
				price: 1999,
				inStock: 7,
				image: "https://imgurl.se",
			};

			const addedProduct = await addProduct(newProduct);

			const productsAfter = await getProducts("");

			expect(productsAfter.length).toBe(productsBeforeLength + 1);
			expect(addedProduct.name).toBe(newProduct.name);
		});

		it("throws an exception if provided argument is not of type object", async () => {
			const newProduct = "newProduct";

			await expect(addProduct(newProduct)).rejects.toThrow(
				"Error: Provided argument must be an object"
			);
		});

		it("throws an exception if a property is missing from new product object", async () => {
			const newProduct = {
				name: "Hockeyskridskor",
				details: "Snabba, snygga, bekväma – vad mer kan behövas?",
				inStock: 10,
				image: "https://imgurl.se",
			};

			await expect(addProduct(newProduct)).rejects.toThrow(
				"Error: New product object must contain following properties: name, details, price, inStock, image"
			);
		});
	});

	describe("function modifyProduct", () => {
		it("should update a product in the database successfully", async () => {
			const id = "3";

			const productToUpdate = {
				details: "Ett mycket kul spel att spela på sommaren",
			};

			const updatedProduct = await modifyProduct(id, productToUpdate);

			expect(updatedProduct.details).toBe(productToUpdate.details);
		});

		it("throws an exception if provided id is not of type string", async () => {
			const id = undefined;
			const productToUpdate = { name: "Skridskor" };

			await expect(modifyProduct(id, productToUpdate)).rejects.toThrow(
				"Error: Invalid id"
			);
		});

		it("throws an exception if no product matches the id", async () => {
			const id = "noneMatchingId";
			const productToUpdate = { description: "Super fun game" };

			await expect(modifyProduct(id, productToUpdate)).rejects.toThrow(
				"Error: No product matching the id"
			);
		});

		it("throws an exception if the second argument is not of type object", async () => {
			const id = "3";
			const productToUpdate = "product";

			await expect(modifyProduct(id, productToUpdate)).rejects.toThrow(
				"Error: Second argument must be of type object"
			);
		});
	});

	describe("function deleteProduct", () => {
		it("should delete a product from the database", async () => {
			const id = "3";

			await deleteProduct(id);

			const allProducts = await getProducts("");

			const deletedProductIndex = allProducts.findIndex(
				(product) => product.id === id
			);

			expect(deletedProductIndex).toBe(-1);
		});

		it("should throw an exception if provided id is not of type string", async () => {});
		it("should throw an exception if no product matches the id", async () => {});
	});
});
