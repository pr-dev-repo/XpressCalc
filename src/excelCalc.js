/**
 * excelCalc - v1.0.5 - 2025-3-24
 * Author: Gabriel A.
 * library to perform excel-like calculations on desired inputs
 **/
(function (global) {
    "use strict";

    const ExcelCalc = {
        /**
         * Process the input, clean invalid characters, and calculate if applicable.
         * 
         * @param {HTMLInputElement} input - The input element with the formula.
         */
        processSingleInput: function (input) {
            let formula = input.value.trim();

            // Reset error state
            this.clearError(input);

            // Ignore calculation if formula does not start with "="
            if (!formula.startsWith("=")) {
                return;
            }

            // Remove the "=" sign from the formula
            let expression = formula.substring(1);

            console.log("Processing formula:", expression);

            // Evaluate the formula
            let result = this.evaluateFormula(expression);

            // If the result is valid, update the input field with the calculated value
            if (result.success) {
                input.value = result.result;
            } else {
                this.setError(input, result.error); // Highlight input and focus on error
                alert(result.error); // Show alert on focus out
            }
        },

        /**
         * Validate keypress to allow only numbers & decimals, and arithmetic operators if '=' is present.
         * 
         * @param {KeyboardEvent} event - The keypress event.
         */
        validateKeypress: function (event) {
            const allowedKeys = ["Backspace", "Tab", "Enter", "ArrowLeft", "ArrowRight", "Delete"];
            const input = event.target;
            const key = event.key;
            const currentValue = input.value;

            // Reset error state on new input
            this.clearError(input);

            // Allow navigation and control keys
            if (allowedKeys.includes(key)) return;

            const hasEqualSign = currentValue.startsWith("=");

            // Allow numbers (0-9)
            if (/\d/.test(key)) return;

            // Allow a single "=" only at the start
            if (key === "=") {
                if (currentValue.includes("=") || input.selectionStart !== 0) {
                    event.preventDefault();
                }
                return;
            }

            if (hasEqualSign) {
                // Allow arithmetic operators only if '=' is present
                if (["+", "-", "*", "/", "(", ")"].includes(key)) return;
            } else {
                // If '=' is NOT present, block anything other than numbers and decimals
                if (["+", "-", "*", "/", "(", ")"].includes(key)) {
                    event.preventDefault();
                    return;
                }
            }

            // Allow one decimal point (.) only if it doesn't exist already
            if (key === "." && !this.hasMultipleDecimals(currentValue)) return;

            // Prevent any other characters
            event.preventDefault();
        },

        /**
         * Check if the input already has a decimal point in the current number sequence.
         * 
         * @param {string} value - The current input value.
         * @returns {boolean} - True if multiple decimals exist.
         */
        hasMultipleDecimals: function (value) {
            const parts = value.split(/[\+\-\*\/\(\)]/); // Split by operators
            return parts.some(part => (part.match(/\./g) || []).length > 1);
        },

        /**
         * Evaluate the formula following the required order of operations.
         * 
         * @param {string} formula - The formula to be evaluated.
         * @returns {object} - The result or error message.
         */
        evaluateFormula: function (formula) {
            try {
                // Replace 'x' with '*' for multiplication
                formula = formula.replace(/x/g, "*");

                // Evaluate the formula using Function constructor (safe eval alternative)
                let result = new Function("return " + formula)();

                // Check for negative result
                if (result < 0) {
                    return { success: false, error: "Negative value detected. Review and amend." };
                }

                // Round result to 2 decimal places
                if (typeof result === 'number') {
                    result = parseFloat(result.toFixed(2));
                }

                // Return result if valid
                return { success: true, result: result };
            } catch (error) {
                // Catch any errors in formula evaluation
                console.log(error);
                return { success: false, error: "Invalid formula syntax. Please review." };
            }
        },

        /**
         * Set error state: highlights input and focuses it.
         * 
         * @param {HTMLInputElement} input - The input field with an error.
         * @param {string} message - The error message.
         */
        setError: function (input, message) {
            input.style.border = "2px solid red"; // Highlight input
            input.style.backgroundColor = "#ffe6e6"; // Light red background
            input.title = message; // Show message on hover

            // Use setTimeout to ensure focus works correctly
            setTimeout(() => {
                input.focus();
                input.selectionStart = input.selectionEnd = input.value.length; // Move cursor to the end
            }, 10); // Small delay to allow focus to take effect
        },

        /**
         * Clear error state: resets input styling.
         * 
         * @param {HTMLInputElement} input - The input field to reset.
         */
        clearError: function (input) {
            input.style.border = ""; // Reset border
            input.style.backgroundColor = ""; // Reset background
            input.title = ""; // Clear message
        },

        /**
         * Attach event listeners to trigger calculation when focusout occurs and validate keypress.
         */
        attachEventListeners: function () {
            document.addEventListener("DOMContentLoaded", function () {
                // Select all inputs within '#calc-zone' that have data-class="Currency"
                document.querySelectorAll('#calc-zone [data-class="Currency"]').forEach(input => {
                    input.addEventListener("focusout", function () {
                        ExcelCalc.processSingleInput(this); // Perform calculation only on focus out
                    });
                    input.addEventListener("keydown", ExcelCalc.validateKeypress.bind(ExcelCalc)); // Prevent invalid keypresses
                });
            });
        }
    };

    // Initialize the ExcelCalc event listeners on page load
    ExcelCalc.attachEventListeners();

    // Expose the module globally
    global.ExcelCalc = ExcelCalc;
})(window);