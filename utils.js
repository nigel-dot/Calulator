// Calculate function - which operator as been clicked
// perform calculation with first and second numbers and return outcome
export const calculate = (n1, operator, n2) => {
	const firstNum = parseFloat(n1);
	const secondNum = parseFloat(n2);
	if (operator === "add") return firstNum + secondNum;
	if (operator === "subtract") return firstNum - secondNum;
	if (operator === "multiply") return firstNum * secondNum;
	if (operator === "divide") return firstNum / secondNum;
};
