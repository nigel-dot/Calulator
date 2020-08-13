// setup constants for Event Listener
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

// listen for all keypresses and - determine the type of key that is pressed
keys.addEventListener("click", (e) => {
	if (e.target.matches("button")) {
		// determine the type of key that is clicked
		const key = e.target;
		const action = key.dataset.action;
		const keyContent = key.textContent;
		const displayedNum = display.textContent;
		const previousKeyType = calculator.dataset.previousKeyType;

		// Remove .is-depressed class from all keys
		Array.from(key.parentNode.children).forEach((k) =>
			k.classList.remove("is-depressed")
		);

		// get the number of the key that was clicked and the current displayed number

		if (!action) {
			if (
				displayedNum === "0" ||
				previousKeyType === "operator" ||
				previousKeyType === "calculate"
			) {
				display.textContent = keyContent;
			} else {
				display.textContent = displayedNum + keyContent;
			}
			calculator.dataset.previousKey = "number";
		}

		// If the key has a data-action that is either add, subtract, multiply or divide,
		// we know the key is an operator.
		if (
			action === "add" ||
			action === "subtract" ||
			action === "multiply" ||
			action === "divide"
		) {
			const firstValue = calculator.dataset.firstValue;
			const operator = calculator.dataset.operator;
			const secondValue = displayedNum;

			//  to check for firstValue and operator because secondValue always exists
			if (
				firstValue &&
				operator &&
				previousKeyType !== "operator" &&
				previousKeyType !== "calculate"
			) {
				const calcValue = calculate(firstValue, operator, secondValue);
				display.textContent = calcValue;

				// Update calculated value as firstValue
				calculator.dataset.firstValue = calcValue;
			} else {
				// If there are no calculations, set displayedNum as the firstValue
				calculator.dataset.firstValue = displayedNum;
			}

			// operator key highlighted so user knows the operator is active.
			key.classList.add("is-depressed");

			// update the display to the clicked key find out if the previous key is an operator key.

			calculator.dataset.previousKeyType = "operator";

			// to get first number store calulators displayed vaule before wiping it clean when operator button gets clicked
			calculator.dataset.firstValue = displayedNum;
			calculator.dataset.operator = action;
		}
		// Calculate function - which operator as been clicked
		const calculate = (n1, operator, n2) => {
			let result = "";

			if (operator === "add") {
				result = parseFloat(n1) + parseFloat(n2);
			} else if (operator === "subtract") {
				result = parseFloat(n1) - parseFloat(n2);
			} else if (operator === "multiply") {
				result = parseFloat(n1) * parseFloat(n2);
			} else if (operator === "divide") {
				result = parseFloat(n1) / parseFloat(n2);
			}

			return result;
		};

		//
		if (action === "decimal") {
			if (!displayedNum.includes(".")) {
				display.textContent = displayedNum + ".";
			} else if (
				previousKeyType === "operator" ||
				previousKeyType === "calculate"
			) {
				display.textContent = "0.";
			}

			calculator.dataset.previousKeyType = "decimal";
		}

		// Clear display and reset to 0 and change to CE if value present
		if (action === "clear") {
			if (key.textContent === "AC") {
				calculator.dataset.firstValue = "";
				calculator.dataset.modValue = "";
				calculator.dataset.operator = "";
				calculator.dataset.previousKeyType = "";
			} else {
				key.textContent = "AC";
			}

			display.textContent = 0;
			calculator.dataset.previousKeyType = "clear";
		}
		if (action !== "clear") {
			const clearButton = calculator.querySelector("[data-action=clear]");
			clearButton.textContent = "CE";
		}
		// Run calulate function after = sign is pressed
		if (action === "calculate") {
			const secondValue = displayedNum;
			const firstValue = calculator.dataset.firstValue;
			const operator = calculator.dataset.operator;

			// Perform calculation after getting 2 values and convert string into a float

			if (firstValue) {
				if (previousKeyType === "calculate") {
					firstValue = displayedNum;
					secondValue = calculator.dataset.modValue;
				}

				display.textContent = calculate(firstValue, operator, secondValue);
			}
			// Set modValue attribute
			calculator.dataset.modValue = secondValue;
			calculator.dataset.previousKeyType = "calculate";
		}
	}
});
