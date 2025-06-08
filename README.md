📝 Blog App API
This is a RESTful Blog API built using NestJS , designed for scalable, maintainable server-side applications. It supports authentication , post management , commenting , dashboard analytics , and even AI-assisted content generation via Gemini 1.5 Flash .

Fully documented via Swagger (OpenAPI 3.0) and supports MongoDB with Mongoose. 

🚀 Features
🔐 Authentication : Signup, login, token refresh, and profile access
📝 Post Management : Create, read, update, delete (CRUD), increment views/likes, search, filter by tag/slug
💬 Comments : Add, retrieve, and delete comments on posts
📊 Dashboard : View summarized data for admin or analytics
🤖 AI-Generated Content : Generate blog ideas, posts, and replies using Gemini 1.5 Flash
✅ DTO Validation : Type-safe and validated requests with class-validator
📦 Docker Support : Easily containerized for deployment
🔧 Swagger UI : Interactive API documentation at /api
📂 Project Structure


1
2
3
4
5
6
7
src/
├── auth/              # User auth, JWT, and roles
├── post/              # Post entity and CRUD operations
├── comment/           # Comment entity and routes
├── dashboard/         # Admin summary endpoints
├── generate-ai/       # AI content generation (Gemini 1.5 Flash)
├── common/            # Shared modules, decorators, guards
🛠️ Installation & Setup
bash


1
2
3
4
5
6
7
8
9
# Clone the repo
git clone https://github.com/your-username/blog-api.git   
cd blog-api

# Install dependencies
npm install

# Create a .env file
cp .env.example .env
⚙️ Environment Variables (.env)
ini


1
2
3
4
MONGO_URI=mongodb://localhost:27017/blog-db
JWT_SECRET=your_jwt_secret
PORT=3000
GEMINI_API_KEY=your_google_gemini_api_key
🧪 Run the App
bash


1
2
3
4
5
# Development mode
npm run start:dev

# Run with Docker
docker-compose up
📘 API Documentation
Visit the interactive Swagger UI at:

🔗 http://localhost:3000/api

🔐 Authentication Endpoints
POST
/auth/signup
Register a new user
POST
/auth/login
Login and get tokens
POST
/auth/refresh
Refresh access token
GET
/auth/profile
Get current user profile

📝 Post Management Endpoints
POST
/post/create
Create a new post
GET
/post/posts
Retrieve all posts
PUT
/post/{id}
Update a post by ID
DELETE
/post/{id}
Delete a post by ID
POST
/post/increment-views/{id}
Increment views of a post
POST
/post/increment-likes/{id}
Increment likes of a post
GET
/post/with-slug
Get post by slug
GET
/post/with-tag
Get posts by tag
GET
/post/search
Search posts
GET
/post/top-posts
Get top posts

💬 Comment Endpoints
POST
/comment/add/{postId}
Add a comment to a post
GET
/comment/all
Retrieve all comments
GET
/comment/{postId}
Get comments for a specific post
DELETE
/comment/{id}
Delete a comment by ID

📊 Dashboard Endpoints
GET
/dashboard/dashboard-summary
Admin dashboard data

🤖 AI Content Generation Endpoints (Gemini 1.5 Flash)
POST
/generate-ai/generate-reply
Generate AI reply to a comment
POST
/generate-ai/generate-post-ideas
Generate blog post ideas
POST
/generate-ai/generate-post
Generate a full blog post

🧩 DTOs & Validation
The app uses class-validator for strong input validation:

CreateAuthDto, LoginAuthDto, RefreshTokenDTO
CreatePostDto, UpdatePostDto
CreateCommentDto
CreateGenerateAiReplyDto, CreateGenerateAiIdeasDto
🖼️ Swagger UI Screenshots
🔗 Full Swagger UI: http://localhost:3000/api

🐳 Docker
bash


1
2
# Build and run with Docker
docker-compose up --build
📌 Tech Stack
Framework
NestJS
Database
MongoDB + Mongoose
Authentication
JWT (Access + Refresh Tokens)
Validation
class-validator
Containerization
Docker + Docker Compose
Documentation
Swagger (OpenAPI 3)
AI Integration
Gemini 1.5 Flash