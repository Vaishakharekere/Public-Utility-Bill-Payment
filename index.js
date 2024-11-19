const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const Queue = require('./queue');
const Stack = require('./stack');

const app = express();
const PORT = 3000;

const paymentQueue = new Queue();
const transactionStack = new Stack();

// Middleware
app.use(bodyParser.json());
app.use(express.static('invoices'));

// Helper Functions
const generateInvoice = (transaction) => {
  const doc = new PDFDocument();
  const filePath = `invoices/${transaction.userId}-${transaction.date}.pdf`;

  doc.pipe(fs.createWriteStream(filePath));
  doc.text(`Invoice for User: ${transaction.userId}`);
  doc.text(`Utility: ${transaction.utility}`);
  doc.text(`Amount: ${transaction.amount}`);
  doc.text(`Date: ${transaction.date}`);
  doc.text(`Transaction ID: ${transaction.transactionId}`);
  doc.end();

  return filePath;
};

const logTransaction = (log) => {
  const logFilePath = 'logs/daily_transactions.json';
  if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
  }
  const existingLogs = fs.existsSync(logFilePath)
    ? JSON.parse(fs.readFileSync(logFilePath))
    : [];
  existingLogs.push(log);
  fs.writeFileSync(logFilePath, JSON.stringify(existingLogs, null, 2));
};

// API Endpoints

// Add a bill payment request
app.post('/payBill', (req, res) => {
  const { userId, utility, amount } = req.body;
  const transaction = {
    userId,
    utility,
    amount,
    transactionId: Date.now(),
    date: new Date().toISOString(),
  };

  paymentQueue.enqueue(transaction);
  transactionStack.push(transaction);

  const invoicePath = generateInvoice(transaction);
  logTransaction({ type: 'normal', ...transaction });

  res.status(200).send({ message: 'Payment request added', invoicePath });
});

// Add an urgent request
app.post('/urgentRequest', (req, res) => {
  const { userId, caseType } = req.body;
  const transaction = {
    userId,
    caseType,
    transactionId: Date.now(),
    date: new Date().toISOString(),
    priority: true,
  };

  paymentQueue.enqueue(transaction, true);
  logTransaction({ type: 'urgent', ...transaction });

  res.status(200).send({ message: 'Urgent request added' });
});

// Process the next request in the queue
app.get('/processRequest', (req, res) => {
  if (paymentQueue.isEmpty()) {
    return res.status(200).send({ message: 'No requests in the queue' });
  }

  const processed = paymentQueue.dequeue();
  res.status(200).send({ message: 'Request processed', processed });
});

// View historical transactions
app.get('/transactions/:userId', (req, res) => {
  const { userId } = req.params;
  const history = transactionStack
    .viewHistory()
    .filter((t) => t.userId === userId);

  res.status(200).send({ message: 'Transaction history retrieved', history });
});

// Undo the last transaction
app.post('/undoPayment', (req, res) => {
  const lastTransaction = transactionStack.pop();

  if (!lastTransaction) {
    return res.status(400).send({ message: 'No transactions to undo' });
  }

  res.status(200).send({ message: 'Transaction undone', lastTransaction });
});

// Get daily logs
app.get('/logs', (req, res) => {
  const logFilePath = 'logs/daily_transactions.json';

  if (!fs.existsSync(logFilePath)) {
    return res.status(200).send({ message: 'No logs found' });
  }

  const logs = JSON.parse(fs.readFileSync(logFilePath));
  res.status(200).send({ message: 'Daily logs retrieved', logs });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

