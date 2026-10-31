const {
    add,
    subtract,
    multiply,
    divide,
    sqrt,
    max
} = require("./math")

describe("Testing the math module", () => {

    test("should add two numbers and return the sum", () => {
        expect(add(2, 3)).toBe(5)
    })

    test("should subtract two numbers and return the difference", () => {
        expect(subtract(10, 4)).toBe(6)
    })

    test("should multiply two numbers and return the product", () => {
        expect(multiply(3, 4)).toBe(12)
    })

    test("should divide two numbers and return the quotient", () => {
        expect(divide(20, 5)).toBe(4)
    })

    test("should return the square root of a number", () => {
        expect(sqrt(16)).toBe(4)
    })

    test("should return the max of two numbers", () => {
        expect(max(7, 12)).toBe(12)
    })
})
