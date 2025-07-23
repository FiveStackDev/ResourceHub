# 🏢 ResourceHub - Simplified Resource Management

> **One-click setup, powerful features, simplified structure**

ResourceHub is a streamlined web application for organizational resource management. Built with simplicity in mind while maintaining enterprise-grade features.

## ⚡ Quick Start

```cmd
# 1. Clone the repository
git clone https://github.com/FiveStackDev/ResourceHub.git
cd ResourceHub

# 2. One-time setup
setup.bat

# 3. Start development
start-dev.bat
```

🎉 **Ready!** Open http://localhost:3000

## 📁 Simplified Project Structure

```
ResourceHub/
├── 🚀 Quick Start
│   ├── setup.bat           # One-click setup
│   ├── start-dev.bat       # Start development  
│   ├── start-prod.bat      # Start production
│   └── test.bat            # Run all tests
│
├── 🎨 Front-End/           # React + Vite app
├── ⚡ Back-End/            # Ballerina API
├── 🐳 docker-compose.yml   # Unified deployment
├── 🌍 .env                # Environment config
├── 📊 database/           # SQL scripts
├── 📁 uploads/            # File storage
└── 📚 docs/               # Documentation
```

## 🌟 Features

- 🍽️ **Meal Management** - Plan organizational meals with calendar integration
- 📦 **Asset Management** - Monitor equipment and resources
- 🔧 **Maintenance Scheduling** - Track service requests and schedules  
- 📊 **User Dashboard** - Role-based personalized dashboards
- 📈 **Report Generation** - Detailed analytics and reporting
- 🔔 **Notifications** - Real-time updates and alerts
- 🏢 **Multi-tenancy** - Support multiple organizations

# Using scripts
./scripts/dev.sh        # Linux/macOS
scripts\dev.bat         # Windows

# Manual Docker Compose
docker-compose -f docker-compose.dev.yml up --build
```

### Production Environment

```bash
make setup-prod
# Edit .env.prod with your configuration
make prod
```

**Detailed setup instructions:** [DevOps Guide](docs/DEVOPS.md)

---

## ✨ Features

### 🔒 Authentication & Authorization

* JWT-based login system
* Role-based access control (Admin & User)

### 🍽️ Meal Management

* Users can request meals via a calendar UI
* Admins manage meal types and times

### 🛠️ Maintenance Management

* Users submit maintenance requests
* Admins prioritize and track maintenance tasks

### 🧰 Asset Management

* Asset request and tracking by users
* Admins manage inventory and handovers

### 👤 User Management

* Admin-side user role control
* Profile editing and preferences

### 📊 Dashboard & Analytics

* Summary statistics for users and admins

### 📧 Email Notifications

* SMTP-based notifications for events and reminders

### 📑 Reporting

* API hooks for PDF report generation
* Admins can generate and download summaries

### 🌙 Theme & UI

* Light/Dark mode toggle
* Responsive sidebar and layout

---

## 🧪 Tech Stack

### 🔧 Backend

* **Language:** Ballerina
* **Runtime:** Ballerina HTTP module
* **Database:** MySQL
* **Email:** SMTP
* **Docs:** OpenAPI (if enabled)

### 💻 Frontend

* **Framework:** React (TypeScript)
* **UI:** Material UI (MUI), Tailwind CSS
* **State Management:** React Query, Axios
* **Routing:** React Router
* **PDF & Charts:** html2pdf.js, Chart.js, Recharts
* **Build Tool:** Vite

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/FiveStackDev/ResourceHub.git
```

---

## 🔧 Backend Setup (`/backend`)

### Install Ballerina:

Download from [https://ballerina.io/downloads/](https://ballerina.io/downloads/)

### Configure `Config.toml`

```toml
[ResourceHub.services]
USER = "your_db_user"
PASSWORD = "your_db_password"
HOST = "localhost"
PORT = "3306"
DATABASE = "your_database_name"
SMTP_HOST = "your_smtp_host"
SMTP_PORT = "587"
SMTP_USER = "your_smtp_user"
SMTP_PASSWORD = "your_smtp_pass"
PDFSHIFT_API_KEY = "your_pdfshift_api_key"
```

### Add MySQL Driver

In `Ballerina.toml`:

```toml
[[platform.java11.dependency]]
groupId = "mysql"
artifactId = "mysql-connector-java"
version = "8.0.26"
```

---

## 🗄️ Database Schema

A detailed SQL schema is provided in the [`backend/README.md`](./backend/README.md), including:

* `users`, `mealtimes`, `mealtypes`, `requestedmeals`
* `assets`, `requestedassets`, `maintenance`, `notification`

📌 **ER Diagram:**

![Database Diagram](https://github.com/user-attachments/assets/b6e15acc-67d6-4530-a637-359ac1f70104)

---

## 📝 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.


