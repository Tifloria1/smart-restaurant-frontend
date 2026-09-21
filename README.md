# Smart Restaurant Management System - Frontend

Frontend application for the Smart Restaurant Management System developed as a Master 2 MIAGE final project.

The application provides a modern web interface for managing restaurant operations including the point of sale, orders, preparation areas, payments, invoices, reservations, cash register sessions, users, reports and administration.

## Technologies

- React
- TypeScript
- Vite
- Node.js 22.16.0
- npm 10.9.2
- React Router
- REST API
- JWT Authentication

## Requirements

Before running the frontend, install:

- Node.js 22.16.0 or a compatible Node.js 22 version
- npm
- Git

Verify the installed versions:

```bash
node -v
npm -v
```

Development environment used for this project:

```text
Node.js: v22.16.0
npm: 10.9.2
```

## Backend Requirement

The frontend communicates with the Smart Restaurant Spring Boot backend.

The backend must be running on:

```text
http://localhost:8083
```

The backend uses:

```text
Java 17
Spring Boot
MySQL
JWT Authentication
```

## Installation

Open a terminal in the frontend project directory:

```powershell
cd C:\restaurant-pos-pfe\frontend
```

Install the dependencies:

```bash
npm install
```

## Run in Development Mode

Start the Vite development server:

```bash
npm run dev
```

The application is normally available at:

```text
http://localhost:5173
```

Open this address in a web browser.

## Production Build

Generate the production build with:

```bash
npm run build
```

The generated files are stored in:

```text
dist/
```

A successful build displays a message similar to:

```text
built in ...s
```

## Authentication

The frontend uses JWT authentication with the Spring Boot backend.

General authentication flow:

```text
User Login
    ↓
Backend Authentication
    ↓
JWT Token
    ↓
Frontend Session
    ↓
Authenticated API Requests
```

Access to pages and features is controlled according to the authenticated user's roles and permissions.

## Roles

The application supports restaurant roles including:

- ADMIN
- MANAGER
- CASHIER
- KITCHEN

The interface is dynamically adapted according to the permissions of the authenticated user.

## Main Modules

The frontend provides interfaces for:

- Dashboard
- Point of Sale (POS)
- Products
- Categories
- Customers
- Dining Tables
- Kitchen
- Bar
- Patisserie
- Orders
- Payments
- Invoices
- Reports
- Reservations
- Cash Register
- Restaurant Settings
- Users
- Audit Logs

## Point of Sale

The POS interface supports:

- Product selection
- Product search
- Category filtering
- Dine-in orders
- Takeaway orders
- Dining table selection
- Cart management
- Quantity management
- Discounts
- Order validation

Validated orders are sent to the backend and routed to the appropriate preparation areas.

## Preparation Areas

The application contains dedicated preparation interfaces for:

```text
Kitchen
Bar
Patisserie
```

Preparation tickets allow restaurant staff to follow and update the preparation workflow.

## Payments and Invoices

Pending orders can be processed through the Payments module.

After payment:

- The order is marked as paid
- The payment is registered
- An invoice is generated
- The associated dining table can be released

Generated invoices can be viewed and downloaded.

## Reservations

The Reservations module allows restaurant staff to manage bookings and their lifecycle.

Reservation statuses include:

- PENDING
- CONFIRMED
- COMPLETED
- CANCELLED

## Cash Register

The Cash Register interface allows authorized users to:

- Open a cash register session
- Enter the opening balance
- View the current session
- Close the session
- Enter the actual closing balance
- Compare actual and expected balances
- View previous cash register sessions

## Dashboard

The dashboard provides an overview of restaurant activity including:

- Today's revenue
- Monthly revenue
- Paid orders
- Average order value
- Products
- Customers
- Open tables
- Today's reservations
- Low-stock products
- Revenue evolution
- Top products
- Recent orders

## Reports

The Reports module provides operational and sales information over a selected date range.

It includes indicators such as:

- Total revenue
- Paid orders
- Average order
- Top products
- Revenue evolution
- Recent paid orders

## Main Restaurant Workflow

```text
Open Cash Register
        ↓
Point of Sale
        ↓
Create Order
        ↓
Kitchen / Bar / Patisserie
        ↓
Preparation
        ↓
Payment
        ↓
Invoice
        ↓
Table Released
        ↓
Close Cash Register
        ↓
Dashboard / Reports Updated
```

## API Communication

The frontend communicates with the backend through REST APIs.

Development architecture:

```text
React + TypeScript + Vite
          ↓
       REST API
          ↓
Spring Boot + JWT
          ↓
        MySQL
```

## Useful Commands

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

## Troubleshooting

If the frontend cannot communicate with the backend:

1. Verify that the Spring Boot backend is running.
2. Verify that port `8083` is available.
3. Verify the frontend API configuration.
4. Verify authentication and JWT token status.
5. Restart the frontend development server if configuration has changed.

If dependencies are missing or the project was copied to another computer:

```bash
npm install
```

Then:

```bash
npm run dev
```

## Academic Context

Smart Restaurant Management System is a Master 2 MIAGE final project.

The objective is to design and implement a complete restaurant management information system covering the principal operational workflow of a single restaurant.

The frontend works together with the Spring Boot backend and MySQL database.