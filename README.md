📦 Inventory Manager (LocalStorage-Based)
This is a simple web-based inventory management system that allows users to add, edit, delete, and store product information using the browser's localStorage. Each user's data is stored separately based on their username.

🧩 Features
✅ User login using a username (no password required)

➕ Add new products with:

Product name

Price

Category

Quantity

📝 Edit existing products

❌ Delete products

💾 Save product list to localStorage per user

📊 View total inventory value per user

🖼️ Interface Overview
Username Input: Enter your name to log in and load your saved inventory.

Product Form: Add or edit product details.

Product Table: Displays all added products with edit/delete buttons.

Save Button: Saves your current product list to localStorage.

User Summary Table: Shows the total inventory value for all users saved in the browser.

🛠️ Technologies Used
HTML

CSS

JavaScript (Vanilla)

localStorage for client-side data persistence

⚠️ Notes
This app does not use a backend — all data is stored locally in the browser.

Data is cleared when the browser's localStorage is cleared or reset.

Multiple users can store data on the same device as long as they use different usernames.
