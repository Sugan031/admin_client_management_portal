## Admin Client Management Portal

This project is used for managing clients by admins, where admins can create, update, and delete clients and assign interests to them.  
The application follows a modern **SPA architecture** with a **Laravel REST API backend** and a **React frontend**.

---

## Tech Stack

### Frontend
- **React JS (v19)**
- JavaScript
- Vite
- Tailwind CSS
- Axios

### Backend
- **Laravel 12**
- PHP
- Laravel Sanctum (Token-based authentication)

### Database
- **MySQL**

---

## Prerequisites

Make sure the following are installed on your system:

- Node.js (v18+ recommended)
- npm
- PHP (v8.2+ recommended)
- Composer
- MySQL
- Git (optional)

---

## Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```
Install dependencies:

```bash
npm install
```
Run the development server:

```bash
npm run dev
```
Or build for production:

```bash
npm run build
npm run preview
```

Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
composer install
```

If Composer is not installed, download it from: https://getcomposer.org/

Environment Configuration

1. Copy .env.example to .env

2. Update database credentials in .env:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=admin_client_management_portal
DB_USERNAME=root
DB_PASSWORD=your_password

Database Migration & Seeding

Run migrations:

```bash
php artisan migrate
```

Seed the database:

```bash
php artisan db:seed
```

Or run both together (recommended for fresh setup):

```bash
php artisan migrate:fresh --seed
```
Run Backend Server

```bash
php artisan serve
```

Backend will run at:

http://localhost:8000

Project Flow
Authentication

    Admins can register and login

    Authentication is handled using Laravel Sanctum

    Token-based authentication is used

    Tokens are stored on the frontend and attached to API requests

Admin Features

Admin can:

    Create clients

    Edit client details

    Delete clients

    Assign multiple interests to a client

    Only authenticated admins can manage clients

Client Management

Each client:

    Belongs to an admin

    Can have multiple interests

    Interests are managed via a many-to-many relationship

    Client list supports pagination

Frontend Flow

    React handles routing and UI rendering

    Axios is used for API communication

    Global loader is shown during API calls

    UI-level validation is implemented for all forms

    Backend validation errors are handled and displayed through alerts

Security

    Protected API routes using auth:sanctum

    Unauthorized access redirects users to login

    Logout invalidates the token on both frontend and backend

Future Enhancements

    Role-based access control

    Search and filter clients

    Improved UI notifications (toasts)

    Dashboard analytics

    Export client data

