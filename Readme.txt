==============================================
Public Utility Bill Payment and Invoice Generation System
==============================================

Overview:
---------
This project is a backend solution designed to streamline utility bill payments for services like electricity, water, and gas. It uses data structures such as queues and stacks, along with file handling techniques, to ensure efficient request processing, prioritization of urgent cases, and automated invoice generation.

Key Features:
-------------
1. Queue Management:
   - Handles normal requests in FIFO order.
   - Processes urgent cases (overdue payments, disconnections, reconnections) with priority.

2. Automated Invoice Generation:
   - Generates PDF invoices for each transaction.

3. Historical Transaction Tracking:
   - Maintains historical records using a stack, allowing users to undo payments.

4. Logging System:
   - Logs daily transactions and overdue cases in JSON/CSV format for auditing.

5. File-Based Data Storage:
   - Stores invoices, logs, and transaction histories for persistence and reliability.

System Requirements:
---------------------
-Technologies:
  - Node.js (v14 or later)
  - Express.js (API framework)
  - PDFKit (for generating invoices)
  - File System Module (for data persistence)
- Hardware:
  - Minimum 4GB RAM, 10GB storage
  - Node.js runtime environment

API Endpoints:
--------------
1. Add a Bill Payment Request:
   - Endpoint: POST /payBill
   - Adds a new bill payment request to the queue.

2. Add an Urgent Request:
   - Endpoint: POST /urgentRequest
   - Adds an urgent case to the priority queue.

3. Process the Next Request:
   - Endpoint: GET /processRequest
   - Processes the next request, prioritizing urgent cases.

4. View Historical Transactions:
   - Endpoint: GET /transactions/:userId
   - Retrieves transaction history for a specific user.

5. Undo Last Transaction:
   - Endpoint: POST /undoPayment
   - Allows undoing the last processed transaction.

6. Retrieve Daily Logs:
   - Endpoint: GET /logs
   - Fetches daily logs in JSON/CSV format.

Setup Instructions:
-------------------
1. Clone the Repository:
   git clone https://github.com/yourusername/utility-bill-payment-system.git 
   cd utility-bill-payment-system

2. Install Dependencies:
   npm install

3. Start the Server:
   node index.js

4. Access the API:
- Default URL: `http://localhost:3000`
- Use tools like Postman or cURL to test the endpoints.
