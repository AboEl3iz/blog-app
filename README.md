# 📝 Blog App

A full-featured blogging platform built with NestJS, MongoDB, and Generative AI (Gemini 1.5 Flash)!  
This app lets users write, manage, and interact with blog posts and comments, featuring robust authentication, admin dashboard, and generative AI-powered content.

---

## ✨ Features

- **Authentication & Authorization**
  - User registration, login, JWT authentication
  - Role-based access (member/admin)
  - Secure profile endpoint

- **Blog Posts**
  - Create, update, delete, and view posts
  - Tags, cover images, drafts, likes, and views
  - AI-generated content detection

- **Comments**
  - Add, fetch, and delete comments
  - Threaded replies and admin moderation

- **Admin Dashboard**
  - Dashboard summary for admins

- **Generative AI Integration**
  - Connects to **Google Gemini 1.5 Flash** via `@google/genai`
  - Generate replies, post ideas, and full posts
  - See `/generate-ai` endpoints

- **Docker Support** 🐳
  - Easily run the entire app in a Docker container
  - Ready-to-use `Dockerfile` and example `docker-compose.yml` for local development

---

## 🐳 Docker Quick Start

1. **Build the image:**
   ```sh
   docker build -t blog-app .
   ```
2. **Run the container:**
   ```sh
   docker run -d -p 3000:3000 --env-file .env blog-app
   ```
3. **With MongoDB using Docker Compose:**
   ```yaml
   # docker-compose.yml example
   version: '3.8'
   services:
     mongo:
       image: mongo:7
       restart: always
       ports:
         - 27017:27017
       environment:
         MONGO_INITDB_ROOT_USERNAME: root
         MONGO_INITDB_ROOT_PASSWORD: example
     blog-app:
       build: .
       ports:
         - 3000:3000
       depends_on:
         - mongo
       environment:
         DATABASE_URL: mongodb://root:example@mongo:27017/blog-app?authSource=admin
         JWT_SECRET: your_jwt_secret
         OPENAI_API_KEY: your_gemini_api_key
   ```
   - Customize the environment variables as needed.
   - Start everything:  
     ```sh
     docker-compose up --build
     ```

---

## 🧩 Services Overview

```mermaid
flowchart TD
    A[User] -->|Auth| B(Auth Service)
    A -->|Posts| C(Post Service)
    A -->|Comments| D(Comment Service)
    A -->|Dashboard| E(Dashboard Service)
    A -->|AI Content| F(Generate AI Service)
    F-->|Gemini 1.5 Flash|G[Google GenAI Cloud]
```

---

## 🚦 API Endpoints

| Service      | Method | Endpoint                           | Description                    | Auth       |
|--------------|--------|------------------------------------|--------------------------------|------------|
| Auth         | POST   | `/auth/signup`                     | Register user                  | ❌         |
| Auth         | POST   | `/auth/login`                      | Login user                     | ❌         |
| Auth         | POST   | `/auth/refresh`                    | Get new JWT                    | ❌         |
| Auth         | GET    | `/auth/profile`                    | Get profile                    | ✔️         |
| Post         | POST   | `/post/create`                     | Create new post                | ✔️ (Admin) |
| Post         | GET    | `/post/posts`                      | List posts                     | ❌         |
| Post         | POST   | `/post/increment-views/:id`        | Increment views                | ✔️         |
| Post         | POST   | `/post/increment-likes/:id`        | Increment likes                | ✔️         |
| Post         | PUT    | `/post/:id`                        | Update post                    | ✔️         |
| Post         | DELETE | `/post/:id`                        | Delete post                    | ✔️         |
| Post         | GET    | `/post/with-slug`                  | Get post by slug               | ❌         |
| Post         | GET    | `/post/with-tag`                   | Get posts by tag               | ❌         |
| Post         | GET    | `/post/search`                     | Search posts                   | ❌         |
| Post         | GET    | `/post/top-posts`                  | Get top posts                  | ❌         |
| Comment      | POST   | `/comment/add/:postid`             | Add comment                    | ✔️         |
| Comment      | GET    | `/comment/all`                     | Get all comments (admin)       | ✔️ (Admin) |
| Comment      | GET    | `/comment/:postid`                 | Get comments for post          | ❌         |
| Comment      | DELETE | `/comment/:id`                     | Delete comment (admin)         | ✔️ (Admin) |
| Dashboard    | GET    | `/dashboard/dashboard-summary`     | Admin dashboard                | ✔️ (Admin) |
| Generate AI  | POST   | `/generate-ai/generate-reply`      | AI generate comment reply      | ❌         |
| Generate AI  | POST   | `/generate-ai/generate-post-ideas` | AI generate blog post ideas    | ❌         |
| Generate AI  | POST   | `/generate-ai/generate-post`       | AI generate blog post          | ❌         |

> ⚠️ *This table may be incomplete. [View all controllers/services in codebase.](https://github.com/AboEl3iz/blog-app/search?q=%40Controller)*

---

## 🤖 Generative AI Integration

- **Model:** [Gemini 1.5 Flash](https://ai.google.dev/)
- **Library:** `@google/genai`
- **Endpoints:** `/generate-ai/generate-reply`, `/generate-ai/generate-post-ideas`, `/generate-ai/generate-post`
- **How it works:**  
  The app sends prompts to Gemini 1.5 Flash to generate replies, post ideas, or articles.
- **API Key:** Configured via `OPENAI_API_KEY` in environment

---

## 🧑‍💻 Example User Schema

```mermaid
classDiagram
    class Auth {
      +String name
      +String email
      +String password
      +String role
      +Date createdAt
      +Date updatedAt
      +String bio
      +String profilePicture
    }
```

---

## 🏁 Getting Started (Non-Docker)

1. Clone the repository
2. Install dependencies: `npm install`
3. Set environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `OPENAI_API_KEY` (for Gemini 1.5 Flash)
4. Run the app: `npm run start:dev`

---

## 🌐 More Info

- Contributions welcome!
- [View code and all endpoints here](https://github.com/AboEl3iz/blog-app/search?q=%40Controller)

---

> _This README was generated with ❤️ and shows a partial list of endpoints. For the full list, explore the codebase!_
