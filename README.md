# Frontend for E-Commerce Project
This document provides all the necessary information to set up and run the frontend of the e-commerce project. The frontend is built using modern web development technologies and frameworks to provide a seamless user experience.
---
## Technologies Used
- Vite (as the build tool)
- React.js (for building the UI)
- Axios (for handling API requests)
- React Router (for navigation)
- ESLint (for code linting and quality)
---

## Features
- Product Display: View available products with their details.
- User Authentication: Integrates with the backend for login and registration.
- Shopping Cart: Add, remove, and update items in the cart.
- Interactive Animations: Smooth transitions and animations for better user experience.

---
## How to Run

**Make sure you have the following installed:**
 - Node.js (v14 or later)
 - MongoDB
- A package manager (npm or yarn)

**Environment Variables**
```bash
VITE_API_URL=<Backend API URL>
```
**Installation**

1. Clone the repository:

    ```bash
   git clone <repository-url>
    cd ecommerce-admin-main
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```
---

## Project Structure

```plaintext
ecommerce-admin-main/
├── public/              # Static files
├── src/                 # Source code
│   ├── components/      # Reusable components
│   ├── pages/           # Page components
│   ├── utils/           # Helper functions
│   ├── App.jsx          # Main app component
│   └── index.jsx        # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # Documentation
```
## Screenshots

### Product List
![Product-List](https://github.com/Redline1e/ecommerce-admin/blob/main/public/screenshots/ptoduct-list.png)

### Add Product Page
![Add-Product-Page](https://github.com/Redline1e/ecommerce-admin/blob/main/public/screenshots/add-product.png)


---
## Notes
Ensure the backend server is running and accessible via the URL specified in VITE_API_URL.
If using a custom domain or local server, update the API URL accordingly in the .env file.

