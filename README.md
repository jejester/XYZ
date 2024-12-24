# XYZ Blog
A responsive and feature-rich blog platform built using ReactJS, NodeJS, ExpressJS, MySQL, and Sequelize. This project supports user authentication, blog post management, commenting, and includes an admin dashboard for seamless content and user management.

# Features
- User Authentication: Secure login and registration with JWT.
- Blog Management: Create, edit, delete, and view blog posts with rich text support.
- Comment System: Add, view, and moderate comments on blog posts.
- Search and Filter: Easily find posts by title, tags, or author.
- Responsive Design: Optimized for all devices and screen sizes.
- Admin Dashboard: Manage users, posts, and comments with ease.

# Technologies Used
### Frontend
- ReactJS
- TailwindCSS
- Formik, Yup Validation
### Backend
- NodeJS
- ExpressJS
### Database
- MySQL
- Sequelize

# Installation
### Prerequisites
- Node.js installed
- MySQL installed

### Setup
1. Clone the repo
 ```
git clone https://github.com/jejester/XYZ.git
cd xyz
```
2. Install the dependecies
```
# For frontend
cd client
npm install

# For backend
cd server
npm install
```
3. Set up the database
- Create a new MySQL Database
- Configure database credentials in `server/config/config.js.`
4. Run migrations:
```
npx sequelize db:migrate
```
5. Start the application
```
# Start backend server
cd server
npm start

# Start frontend server
cd client
npm start
```
6. Access the application
- Open your browser and navigate to `http://localhost:3000`
