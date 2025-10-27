# Upay: A Simple Banking Wallet application 

This project is a simplified full-stack application designed to emulate basic banking wallet features, including user authentication (Sign Up/Sign In), viewing account balances, and peer-to-peer
money transfers. The backend is built with **Node.js/Express** and **MongoDB** (using Mongoose), and the frontend is a **React** application.

---

## Key Features

### Backend (Node.js/Express)
* **Secure Authentication:** User sign-up, sign-in, and authorization using JWTs (JSON Web Tokens) via `express-jwt`.
* **Data Validation:** Robust input validation using **Zod** schema library for all routes (`/signup`, `/signin`, `/update`).
* **Database Transactions:** Safe money transfers implemented using **MongoDB Transactions** to ensure atomicity (all or nothing) between account updates.
* **User Management:** Functionality to update user information and a bulk search feature to find other users for transfers.
* **Account Management:** Dedicated routes for fetching account balance and performing transfers.

### Frontend (React/Vite)
* **React Router:** Single Page Application (SPA) routing for a smooth user experience.
* **State Management:** Local state (`useState`) to manage form inputs and user data.
* **API Interaction:** Uses `axios` for making HTTP requests to the backend.
* **Protected Routes:** User redirection to the `/dashboard` upon successful login/signup, with JWT stored in `localStorage`.
* **Design:** A clean, modern UI built using Tailwind CSS utility classes.

---

## Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **React.js (Vite)** | SPA framework for the client-side application. |
| **Backend** | **Node.js, Express** | Runtime environment and minimal server framework. |
| **Database** | **MongoDB (Mongoose)** | NoSQL database for flexible data storage. |
| **Authentication** | **JWT (JSON Web Tokens)** | Secure token-based user authorization. |
| **Validation** | **Zod** | Schema validation for all incoming API data. |

---

## Local Setup and Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

* Node.js (v18 or higher)
* MongoDB Instance (local or cloud like MongoDB Atlas)

### 1. Configure Backend

Navigate to the `backend` directory.

```bash
cd backend
npm install
Create .env file: Create a file named .env in the backend root with your MongoDB connection string and a JWT secret.


DATABASE_URL=<YOUR_MONGODB_CONNECTION_STRING>
JWT_SECRET=your_jwt_secret_key
Run Migrations: While using a NoSQL DB, we need to ensure the schema is correct.

```bash
npx prisma generate
Start the Backend Server: The backend will run on http://localhost:3000.
npm run dev
```

### 2. Configure Frontend
Open a new terminal window and navigate to the frontend directory.

```bash
cd ../frontend
npm install
```

# Vite requires the VITE_ prefix for environment variables
VITE_BACKEND_URL=http://localhost:3000
Start the Frontend Application: The frontend will run on http://localhost:5173.

```bash
npm run dev
Your application should now be accessible in your browser at http://localhost:5173.
```

# Key Takeaways
1. Robust Server-Side Validation
The use of Zod in the user.js and other backend files is a critical component of security and reliability. It ensures that the application server only processes data that conforms to the expected schema, preventing crashes and malicious input.

2. The Power of MongoDB Transactions
The most critical part of this application is the money transfer logic in account.js.

JavaScript

const session = await mongoose.startSession();
session.startTransaction();
// ... logic to debit and credit accounts ...
await session.commitTransaction();
By using sessions and transactions, the transfer operation becomes atomic: if the debit fails for any reason (e.g., recipient not found, insufficient balance), the entire operation is 
rolled back, preventing any user from losing money or accounts from having inconsistent balances. This is a best practice for financial logic in a database.

# 3. Client-Server Architecture (Local vs. Deployed)
The need for the VITE_BACKEND_URL environment variable highlights a core concept in client-server architecture:

The Frontend (React) is agnostic about where the API is hosted.

By using an environment variable, you can switch the backend target (e.g., http://localhost:3000 for development vs. https://syssight-express-server.onrender.com for production) without 
changing any application code.

# Conclusion
This project serves as an excellent foundation for a secure, full-stack application. It successfully demonstrates modern development practices, including: secure token-based 
authentication, validated API inputs, and reliable database transactions, making it a robust starting point for any application involving sensitive financial data.
