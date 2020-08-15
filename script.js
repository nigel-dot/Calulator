// setup constants for Event Listener
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

// listen for all keypresses and - determine the type of key that is pressed
keys.addEventListener("click", (e) => {
	if (e.target.matches("button")) {
		const key = e.target;
		const action = key.dataset.action;
		const keyContent = key.textContent;
		const displayedNum = display.textContent;
		const previousKeyType = calculator.dataset.previousKeyType;

		// Remove .is-depressed class from all keys with a loop
		Array.from(key.parentNode.children).forEach((k) =>
			k.classList.remove("is-depressed")
		);

		// Calculate function - which operator as been clicked
		// perform calculation with first and second numbers and return outcome
		const calculate = (n1, operator, n2) => {
			const firstNum = parseFloat(n1);
			const secondNum = parseFloat(n2);
			if (operator === "add") return firstNum + secondNum;
			if (operator === "subtract") return firstNum - secondNum;
			if (operator === "multiply") return firstNum * secondNum;
			if (operator === "divide") return firstNum / secondNum;
		};

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
				//display.textContent = calcValue; commented out to stop vaule being shown

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

		// if decimal point clicked stop it from being able to be clicked multiple times
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
		// Clear display and reset to 0 and change to CE if value present in display
		if (action !== "clear") {
			const clearButton = calculator.querySelector("[data-action=clear]");
			clearButton.textContent = "CE";

			console.log("not clear");
			console.log("displayedNum", displayedNum);
			console.log("previousKeyType", calculator.dataset.previousKeyType);
			console.log("previousKey", calculator.dataset.previousKey);
			console.log("firstValue", calculator.dataset.firstValue);
			console.log("key content", key.textContent);
		}
		// Clear display and reset values if AC value present otherwise set clear key to AC
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
			console.log("clear");
			console.log("displayedNum", displayedNum);
		}

		// Run calulate function after equal sign is pressed
		if (action === "calculate") {
			let firstValue = calculator.dataset.firstValue;
			const operator = calculator.dataset.operator;
			const secondValue = displayedNum;

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
