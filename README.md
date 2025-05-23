# Fullstack Application

This project is a fullstack application built with the following technologies:

## Frontend
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for styling.

## Backend
- **Express**: A web application framework for Node.js.
- **TypeScript**: Used for type safety in the backend as well.
- **Prisma**: An ORM for Node.js and TypeScript that simplifies database access.
- **PostgreSQL**: A powerful, open-source relational database system.

## Project Structure
The project is organized into two main directories: `client` for the frontend and `server` for the backend.

### Client
- `public/`: Contains static files like `index.html` and `favicon.ico`.
- `src/`: Contains the source code for the React application, including components, pages, styles, and types.
- `tailwind.config.js`: Configuration for Tailwind CSS.
- `tsconfig.json`: TypeScript configuration for the frontend.
- `package.json`: npm configuration for the frontend.
- `vite.config.ts`: Configuration for Vite, the build tool.

### Server
- `src/`: Contains the source code for the Express application, including controllers, routes, middleware, and Prisma schema.
- `tsconfig.json`: TypeScript configuration for the backend.
- `package.json`: npm configuration for the backend.

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the client directory and install dependencies:
   ```
   cd client
   npm install
   ```

3. Navigate to the server directory and install dependencies:
   ```
   cd ../server
   npm install
   ```

4. Set up the database using Prisma:
   ```
   npx prisma migrate dev
   ```

### Running the Application

1. Start the backend server:
   ```
   cd server
   npm run start
   ```

2. Start the frontend development server:
   ```
   cd ../client
   npm run dev
   ```

### Usage
- Access the frontend application at `http://localhost:3000`.
- The backend API can be accessed at `http://localhost:5000`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.