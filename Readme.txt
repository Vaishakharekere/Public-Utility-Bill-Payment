# Public Utility Bill Payment and Invoice Generation System

### **Overview**
This project is a backend solution for streamlining utility bill payments for services like electricity, water, and gas. It integrates **queues**, **priority handling**, **stacks**, and **file-based data storage** to process requests efficiently, prioritize urgent cases, and provide automated invoice generation. The system ensures smooth operations for users and utility companies, addressing common inefficiencies in bill management systems.

---

### **Features**
1. **Efficient Queue Management:**
   - Normal requests handled in **FIFO** order.
   - **Priority Queue** for overdue payments, disconnection notices, and reconnection requests.

2. **Automated Invoice Generation:**
   - Generates invoices in PDF format for each payment.

3. **Historical Transaction Management:**
   - Uses a **stack** to store and allow undoing of previous transactions.

4. **Comprehensive Logging:**
   - Logs daily transactions and overdue payments in **JSON/CSV** format for auditing.

5. **File-Based Persistence:**
   - Stores invoices, logs, and transaction histories using the file system.

---

### **System Requirements**
- **Technologies:**
  - Node.js (v14+)
  - Express.js (for API endpoints)
  - PDFKit (for PDF generation)
  - File System Module (for data persistence)
- **Hardware:**
  - Minimum: 4GB RAM, 10GB storage
  - Node.js runtime installed

---

### **API Endpoints**

1. **Add a Bill Payment Request**
   - **POST /payBill**
   - Adds a new bill payment request to the normal queue.

2. **Add an Urgent Request**
   - **POST /urgentRequest**
   - Adds an urgent case to the priority queue.

3. **Process the Next Request**
   - **GET /processRequest**
   - Processes the next request, prioritizing urgent cases.

4. **View Historical Transactions**
   - **GET /transactions/:userId**
   - Retrieves transaction history for a user.

5. **Undo Last Transaction**
   - **POST /undoPayment**
   - Undoes the last processed transaction.

6. **Get Daily Logs**
   - **GET /logs**
   - Retrieves daily logs for auditing.

---

### **Setup Instructions**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/utility-bill-payment-system.git
   cd utility-bill-payment-system
2.Install Dependencies:
    npm install
3.Run the Server:
  node index.js
4.Access the API:
  -The server runs by default on http://localhost:3000.
  -Use tools like Postman or cURL to interact with the endpoints.
