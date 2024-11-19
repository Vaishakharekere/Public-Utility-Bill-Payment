
API:
POST /payBill


{
  "userId": "user123",
  "utility": "Electricity",
  "amount": 500
}



POST /urgentRequest

{
  "userId": "user123",
  "caseType": "Disconnection Notice"
}


GET /processRequest

{
  "message": "Request processed",
  "processed": {
    "userId": "user123",
    "utility": "Electricity",
    "amount": 500,
    "transactionId": 1692373837,
    "date": "2024-11-19T12:00:00Z"
  }
}

GET /transactions/:userId

{
  "message": "Transaction history retrieved",
  "history": [
    {
      "userId": "user123",
      "utility": "Electricity",
      "amount": 500,
      "transactionId": 1692373837,
      "date": "2024-11-19T12:00:00Z"
    }
  ]
}

POST /undoPayment

{
  "message": "Transaction undone",
  "lastTransaction": {
    "userId": "user123",
    "utility": "Electricity",
    "amount": 500,
    "transactionId": 1692373837,
    "date": "2024-11-19T12:00:00Z"
  }
}

GET /logs

