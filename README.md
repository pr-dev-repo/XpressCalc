# Excelator - Excel-Like Formula Processing Library

![Excelator](https://img.shields.io/badge/version-1.0.5-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg)

**Excelator** is a lightweight JavaScript library that enables Excel-like calculations in HTML input fields. It supports numeric inputs, arithmetic operations, and real-time validation.

## 🚀 Features

- ✅ Supports standard arithmetic operations (`+`, `-`, `*`, `/`, `()`).
- ✅ Allows formulas to begin with `=` like Excel.
- ✅ Live input sanitization to prevent invalid characters.
- ✅ Rounds results to 2 decimal places.
- ✅ Highlights input errors and alerts users.
- ✅ Lightweight and dependency-free.

## 📦 Installation

Include the script in your HTML file:

```html
<script src="path/to/excelator.js"></script>
```

Or, install via npm:

```sh
npm install excelator
```

## 🚀 Usage

### 1️⃣ Initialize Inputs

Ensure your inputs are wrapped inside a container with `id="calc-zone"` and have the attribute `data-class="Currency"`.

```html
<div id="calc-zone">
    <input type="text" data-class="Currency" placeholder="Enter formula or number">
    <input type="text" data-class="Currency" placeholder="Enter another value">
</div>
```

### 2️⃣ Automatic Calculation

The library will automatically process the input on `focusout`:

```js
Excelator.attachEventListeners();
```

### 3️⃣ Supported Input Formats

| Input | Valid? | Result |
|--------|--------|---------|
| `=10+20` | ✅ Yes | `30` |
| `=100/2+5` | ✅ Yes | `55` |
| `50` | ✅ Yes | `50` |
| `=10*-5` | ❌ No | Error (Negative values not allowed) |
| `abc123` | ❌ No | Error |

## ⚡ API Methods

### `Excelator.processSingleInput(input)`
Manually process an input field.

```js
const input = document.querySelector('input');
Excelator.processSingleInput(input);
```

### `Excelator.validateKeypress(event)`
Prevents invalid characters from being entered.

```js
document.querySelector('input').addEventListener('keydown', Excelator.validateKeypress.bind(Excelator));
```

### `Excelator.setError(input, message)`
Applies error styling and focus.

```js
Excelator.setError(document.querySelector('input'), 'Invalid input!');
```

### `Excelator.clearError(input)`
Removes error styling.

```js
Excelator.clearError(document.querySelector('input'));
```

## 🛠️ Customization

Modify styles for error highlighting:

```css
input.error {
    border: 2px solid red;
    background-color: #ffe6e6;
}
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Gabriel A.** - Built with ❤️

---

Give a ⭐ if you find this useful!

