# Library Management System

This is a MERN stack application built for easy and effctive Library management.

## Description

### Performance
- This application employs clustering technique for **load balancing**, resulting in close to zero downtime for the website.
- The frontend uses **code splitting** to speed up the initial render and prevent the loading of irrelevant code in the browser for the user.

### Security
The application uses JsonWebTokens (JWT) for authentication to enhance security. Data validation and schema description libraries JOI and YUP are utilized to prevent any unauthorized data processing by the server.

### Special Features
- Realtime E-Book(PDF) viewing in browser
- OAuth2.0 Google SignIn
- Server sends 10:00am reminder emails to users with due books everyday.
- Server sends an email at 00:00 am to users who have no active plan.

### Features
The application caters to two types of users: Librarians and Patrons (General public). Both groups have access to different features tailored to their specific needs. The following is a list of features and their explanations for each type of user:
<pre>
Admin:
a. Issue - The ability to issue books to users.
b. Return - The ability to un-issue books from users.
c. Requested Books - The ability to view books requested by users.
d. Cancel Request - The ability to cancel any requested book.
e. Issued Books - Access to a list of all issued books.
f. Un-Issued Books - Access to a list of all un-issued books.
g. Add Book - The ability to add books to the inventory.
h. Add E-Book - The ability to add e-book for a particular book
i. Delete Book - The ability to delete books from the inventory.
j. All Users - Access to a list of all users enrolled in the library.
k. Delete User - The ability to delete a user from the library.
l. Inventory - Access to a list of all books in the library with the ability to search and filter based on various parameters.


 (General User):
a. Request - The ability to request a book.
b. Issued Books - Access to a list of all books issued by them.
c. Inventory - Access to a list of all books in the Library.
e. Forgot PassWord - The ability to reset their password in case of forgetting it.
f. Rating Books - The ability to rate books they have issued.
g. Contact - The ability to contact the admin at any time.
h. Related Books - The ability to view all books related to a specific genre.
i. Review - The ability to rate and comment on books they have issued.
j. View E-Book - Users can view PDF of their issued books in realtime
</pre>


## Getting Started

### Dependencies

#### Frontend

- redux-toolkit
- react-router-dom
- Material UI
- react-toastify
- react-pdf
- formik
- yup
- axios

#### Backend

- JsonWebTokens(JWT)
- Joi
- bcryptjs
- mongoose
- express-async-handler
- node-cron
- cors
- axios
- multer
- multer-gridfs-storage

#### Dev Dependencies

- nodemon

