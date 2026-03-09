# SecureVault Backend API

SecureVault is a secure backend system for file storage built with Node.js and Express.

## Features

- User authentication with JWT
- Secure file upload and download
- PostgreSQL database integration
- Role-based access control
- Request logging and error handling
- Rate limiting for API protection
- Docker deployment support

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Docker

## Project Structure
```
src
├── routes
├── controllers
├── services
├── models
├── middleware
├── utils
├── app.js
└── server.js
```


## API Endpoints
```
GET /health
POST /auth/register
POST /auth/login
POST /files/upload
GET /files
DELETE /files/:id
```

## Setup / Installation

Clone the repository
```
git clone https://github.com/pranitap123/securevault-backend.git

cd securevault-backend
```

Install dependencies
```npm install```

Run the server
```npm run dev```

## Future Improvements

- AES file encryption
- Cloud storage integration
- Background job processing