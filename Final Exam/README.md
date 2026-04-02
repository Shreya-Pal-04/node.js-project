# Blog Admin API

## Description

This is a simple Node.js and Express project for admin and blog
management.\
Admin can register, login and manage blogs.

------------------------------------------------------------------------

## Features

-   Admin Register & Login\
-   JWT Authentication\
-   Admin Profile Update\
-   Blog Create, Read, Update, Delete\
-   Image Upload using Multer

------------------------------------------------------------------------

## Technologies Used

-   Node.js\
-   Express.js\
-   MongoDB\
-   Mongoose\
-   JWT\
-   Multer\

------------------------------------------------------------------------

## API Routes

### Admin

-   POST /api/admin/register
-   POST /api/admin/login
-   GET /api/admin/profile
-   PUT /api/admin/update
-   DELETE /api/admin/delete

### Blog

-   POST /api/admin/add-blog
-   GET /api/admin/all-blogs
-   GET /api/admin/blog/:id
-   PUT /api/admin/update-blog/:id
-   DELETE /api/admin/delete-blog/:id

------------------------------------------------------------------------

## Environment Variables

Create a .env file and add:

PORT=8000\
MONGO_URI=your_mongodb_url\
JWT_SECRET=your_secret

------------------------------------------------------------------------

## Notes

-   Use Postman for testing APIs\
-   Use form-data for image upload\
-   Images are stored in uploads folder

------------------------------------------------------------------------