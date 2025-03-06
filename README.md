# The Statement App

The Statement App is a web app that analyzes M-Pesa statements.  

I created this after a year of poor financial decisions. 🙂  

It’s hosted on Vercel: [Statement App](https://statement-app.vercel.app/). There’s no database, hence no data is being stored. The backend is built with FastAPI in Python. At this point, I’m kinda satisfied with it, but I might be updating more. Feel free to contribute!  

---

## Features

- **PDF Decryption**: Users can upload password-protected PDFs, and the app extracts transaction data after decryption.  
- **Data Cleaning & Processing**: Extracted transaction data is cleaned and formatted for analysis.  
- **Session-Based Analysis**: Each session is assigned a unique ID to track user interactions and prevent excessive memory usage.  
- **Querying & Filtering**: Users can filter transaction data based on date ranges, account names, and transaction types.  
- **Automatic Session Cleanup**: Sessions are periodically cleared to optimize memory usage.  

---

## Tech Stack

### **Frontend**
- React 
- Axios
- Tailwind CSS   

### **Backend**
- FastAPI (Handles API requests, session cleanup, and data processing)  
- Pandas (Processes transaction data)  

---

## Setup Instructions

### **Prerequisites**
Ensure you have the following installed:  
- Python 3.8+  
- Node.js & npm  

### **Backend Setup**
```sh
cd statement-app/backend
```
Create a virtual environment and activate it:
```sh
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```
Install the required packages:
```sh
pip install -r requirements.txt
```
Run the FastAPI server:
```sh
cd api
fastapi dev main.py
```

### **Frontend Setup**
```sh
cd ../frontend
```
Install the required packages:
```sh
npm install
```
Run the React app:
```sh
npm run dev
```

### API  Endpoints
### Upload & Decrypt PDF
- **Endpoint:** `POST /decrypt/`  
- **Description:** Accepts a PDF file and a password, decrypts it, and returns structured transaction data along with a session ID.  

### Query Transactions
- **Endpoint:** `POST /query/`  
- **Description:** Allows users to filter transactions by date, account name, or transaction type using the assigned session ID.  

### Sample analysis
- **Endpoint:** `POST /sample_analysis/`
- **Description:** Returns a sample analysis of a saved M-Pesa statement using the assigned session ID.(In case you want to check the app out, but don't have an M-Pesa statement to upload)

### Session Cleanup
The backend assigns each session a unique `session_id`, which is sent to the frontend. The session data is stored in memory and automatically cleaned using scheduled tasks:  

- **Short-Term Cleanup**: Runs every 15 minutes to clear inactive sessions.  
- **Max Sessions Cleanup**: Prevents memory overflow by limiting stored sessions.  
- **Daily Cleanup**: Clears all sessions older than 24 hours.  


### Possible improvements
Downloading the analysis PDF<br>

