// Unit tests for calculate function of calculator

import { calculate } from "./utils.js";

// test to see if Jest is working
test("test works", () => {
	expect(1).toBe(1);
});
// 2 tests to see if add feature is working
describe("test calulate add function", () => {
	test("adds 1.5 + 2.6 to equal 4.1", () => {
		expect(calculate(1.5, "add", 2.6)).toBe(4.1);
	});
	test("adds -25 + -30 to equal 55", () => {
		expect(calculate(-25, "add", -30)).toEqual(-55);
	});
});
// 2 tests to see if subract feature is working
describe("test calulate subtract function", () => {
	test("subtracts 5 - 3 to equal 2", () => {
		expect(calculate(5, "subtract", 3)).toBe(2);
	});
	test("subtracts -25 - 8 to equal -33", () => {
		expect(calculate(-25, "subtract", 8)).toEqual(-33);
	});
});
// 2 tests to see if multiply feature is working
describe("test calulate multiply function", () => {
	test("multiplies 9 * 3 to equal 27", () => {
		expect(calculate(9, "multiply", 3)).toBe(27);
	});
	test("multiplies 45.8 * 2.9 to equal 132.82", () => {
		expect(calculate(45.8, "multiply", 2.9)).toEqual(132.82);
	});
});
// 2 tests to see if divide feature is working
describe("test calulate divide function", () => {
	test("divides 18 ÷ 3 to equal 6", () => {
		expect(calculate(18, "divide", 3)).toBe(6);
	});
	test("divides 90.6 ÷ 6 to equal 15.1", () => {
		expect(calculate(90.6, "divide", 6)).toBe(15.1);
	});
});
