<h1 align="center">
	<img
		width="300"
		alt="TASKIFY"
		src="https://github.com/YourUsername/TASkify/blob/main/public/img/logo.jpg">
</h1>

<h3 align="center">
	TASKIFY– Task Management System
</h3>

## 📖 Table of Contents

<details>
<summary>Click to expand</summary>

- [📖 Table of Contents](#-table-of-contents)
- [📷 Demo](#-demo)
- [⛓ Description](#-description)
	- [User Authentication](#user-authentication)
	- [Task Management](#task-management)
	- [Task Assignment](#task-assignment)
	- [Real-Time Updates](#real-time-updates)
	- [Dashboard](#dashboard)
	- [Fully Responsive](#fully-responsive)
- [🔨 Development](#-development)
	- [Tech Stack](#tech-stack)
- [☑️ Installation](#-installation)
	- [Prerequisites](#prerequisites)
	- [Backend Setup (Laravel)](#backend-setup-laravel)
	- [Frontend Setup (React)](#frontend-setup-react)
	- [Usage](#usage)
- [🤝 Collaborators](#-collaborators)

</details>

# 📷 Demo

https://github.com/user-attachments/assets/adbc0b42-57eb-4da1-84b9-883ce427b29a

# ⛓ Description

<p align="center">
	<b>TASKIFY</b> is a task management application developed to help users efficiently manage their tasks and collaborate with others. Built with Laravel for the backend and ReactJS with Inertia.js for the frontend, it provides a seamless, modern, and responsive interface for creating, assigning, and updating tasks.
</p>

## 1️⃣ User Authentication
- Secure user registration and login system.
- Each user gets their personalized task dashboard upon logging in.

## 2️⃣ Task Management
- Create, update, and delete tasks.
- Add task details: title, description, deadline, and status (To-do, In Progress, Completed)

https://github.com/user-attachments/assets/d628ecca-f265-4aa2-b51d-49468e995a2d

.

## 3️⃣ Task Assignment
- Assign one or more members to a task.
- Assigned tasks automatically appear on the assigned members’ dashboards.

## 4️⃣ Real-Time Updates
- When a task’s type/status is updated, the changes are instantly reflected in the dashboards of all assigned users.

## 5️⃣ Dashboard
- View tasks organized by type.
- Track task status and deadlines at a glance.

## 6️⃣ Fully Responsive
- Designed with Tailwind CSS for a clean, modern look on desktop, tablet, and mobile devices.

---

# 🔨 Development

## 🛠 Tech Stack

- Backend: [![Laravel](https://img.shields.io/badge/Laravel-11-red?style=flat-square&logo=laravel&logoColor=white)](https://laravel.com/)
- Frontend: [![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
- Routing & Inertia: [![Inertia.js](https://img.shields.io/badge/Inertia.js-SPA-lightgrey?style=flat-square)](https://inertiajs.com/)
- Database: [![MySQL](https://img.shields.io/badge/MySQL-Database-orange?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
- Styling: [![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Styling-teal?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

# ☑️ Installation

## Prerequisites
- PHP >= 8.2.12
- Composer
- Node.js >= 22.13
- MySQL or compatible database

## Backend Setup (Laravel)

```bash
git clone https://github.com/YourUsername/TASKIFY.git
cd TASKIFY
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
cd resources/js
npm install
npm run dev
```

## 📦 Usage

1. **Register a new account** or **log in** if you already have one.
2. Inside your **dashboard**, click **"Create Task"** to add a new task.
3. Fill in the task details:
   - Title
   - Description
   - Deadline
   - Status (To-do, In Progress, Completed)
   - Assigned Members
4. Once created, the task appears in:
   - Your dashboard
   - The dashboards of all assigned members
5. Tasks can be **updated** and **deleted** anytime.
6. When you update a task’s type/status, it will instantly update for all assigned members.
7. Manage your tasks and track progress easily via your personalized task board.

8. 
# 🤝 Collaborators

We collaborated to develop **Edumate**, each contributing to different aspects of the project:

| Name                | GitHub Profile                                      | Role                                                |
|-------------------- |---------------------------------------------------- |---------------------------------------------------- |
| **Younes BOUKRIM**  | [BoukrimYounes](https://github.com/BoukrimYounes)   | UI/UX Designer, Frontend Developer (React)          |
| **Chaimaa AFKIR**   | [Chaimaa101](https://github.com/Chaimaa101)         | Backend Developer , API Tester                      |



