Collaborative Notes App

A full-stack collaborative notes application built with the MERN Stack (MongoDB, Express, React, Node.js).
Users can create notes, edit them using a rich text editor, search notes, and collaborate with other users.

 Features
 
 
Authentication

  User Registration

  User Login

  JWT Authentication

  Password hashing using bcrypt

Notes Management

  Create notes

  Edit notes

  Delete notes (owner only)

  Rich text editor support

Collaboration

  Add collaborators to notes

  Collaborators can view and edit notes

  Owner manages collaborators

Search

  Full-text search across note titles and content

 Frontend

Responsive UI using React + TailwindCSS

Rich text editing using React Quill

 Tech Stack
Frontend

 React

 React Router

 Axios

 TailwindCSS

 React Quill

Backend

 Node.js

 Express.js

 MongoDB

 Mongoose

 JWT Authentication

 bcryptjs

Installation
  Clone the Repository
git clone https://github.com/RM654/Notepad.git
cd collab-notes
 
Backend Setup

Install dependencies

cd backend
npm install

Create .env file

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start server
npm run dev

Backend runs on:

http://localhost:5000
 
Frontend Setup

Install dependencies

cd frontend
npm install
Start frontend
npm run dev

Frontend runs on:

http://localhost:5173

API Endpoints

Authentication
Register User
POST /api/auth/register

Body

{
"name": "John Doe",
"email": "john@example.com",
"password": "123456"
}
Login
POST /api/auth/login

Body

{
"email": "john@example.com",
"password": "123456"
}
Notes
Get all notes
GET /api/notes
Create note
POST /api/notes

Body

{
"title": "My Note",
"content": "This is my note"
}
Get single note
GET /api/notes/:id
Update note
PUT /api/notes/:id
Delete note
DELETE /api/notes/:id

Owner only.

Add collaborator
POST /api/notes/:id/collaborators

Body

{
"email": "friend@email.com"
}
Search notes
GET /api/notes/search?query=keyword
  
Authentication

All note routes require JWT token.

Header format:

Authorization: Bearer TOKEN

Future Improvements

  Real-time collaboration (Socket.io)

  Shareable note links

  Note folders

  Dark mode

  Markdown support

  Version history

Author

M.Rashmini
