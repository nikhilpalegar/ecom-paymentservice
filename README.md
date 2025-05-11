# ecom-paymentservice

This repository contains the frontend and the backend microservice for processing payments in an e-commerce platform. It supports both UPI and card payments, stores transaction data in MongoDB, and is fully containerized and deployable on Kubernetes using Minikube.

## Features

- Accepts UPI and Card-based payments
- Validates payment input data
- Simulates payment processing
- Stores payment records in MongoDB
- RESTful API built with Express.js
- Dockerized and Kubernetes-ready

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend** React
- **Database:** MongoDB
- **Containerization:** Docker
- **Orchestration:** Kubernetes (Minikube)

**Build the Docker image for Backend**:
In directory "paymentservice-backend", run the below command to build the docker image

```bash
   docker build -t payment-service:latest .
   ```

**Build the Frontend**:
In directory "paymentservice-frontend", run the below commands

```bash
   npm install
   npm start
   ```

URL to React frontend UI
```bash
   http://localhost:3000/
   ```
