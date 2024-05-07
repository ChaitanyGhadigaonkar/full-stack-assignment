## Setup

1. Clone the repository: `git clone https://github.com/ChaitanyGhadigaonkar/full-stack-assignment`
2. Navigate to the project directory: `cd full-stack-assignment`
3. Install dependencies:
   `cd Frontend && yarn`
   `cd Backend && yarn`
## Important
Please check the database.sql for the database setup and for admin we have to update the user to admin manually using sql query.

## Environment Variables

This project requires the following environment variables: look for the .env.example for backend

PORT<br>
PG_PASSWORD<br>
JWT_SECRET<br>
CLOUDINARY_CLOUD_NAME<br>
CLOUDINARY_API_KEY<br>
CLOUDINARY_API_SECRET<br>

# Backend Routes

Describes the backend routes for the full-stack-assignment project.

## User Routes

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Log in an existing user.
- `GET /api/users/logout`: Log Out
- `POST /api/users/forgot-password`: Forgot password
- `POST /api/users/reset-password`: Reset password

## Cabs Routes for users

- `GET /api/cabs` : Get all cabs
- `GET /api/cabs/:id` : Get cab with id

## Bookings routes for users

- `GET /api/bookings` : Get all bookings of logged in user
- `POST /api/bookings` : Create a new booking

- `GET /api/bookings/:id` : Get booking with id
- `PUT /api/bookings/:id` : Update booking with id
- `DELETE /api/bookings/:id` : Delete booking with id

## Admin Routes

- `GET /api/admin/bookings` : Get all bookings of all users
- `POST /api/admin/bookings` : Create booking

- `PUT /api/admin/bookings/:id` : Update booking like status, source and destination
- `DELETE /api/admin/bookings/id` : Delete Booking
  <br>

- `GET /api/admin/users` : Get all users
- `POST /api/admin/users` : Create new user

- `PUT /api/admin/users/:id` : Update users role
- `DELETE /api/admin/users/id` : Delete users
  <br>

- `POST /api/admin/cabs` : Create new cab

- `PUT /api/admin/cabs/:id` : Update cab details
- `DELETE /api/admin/cabs/id` : Delete cab
