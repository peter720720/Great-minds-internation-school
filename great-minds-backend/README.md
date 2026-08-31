# Great Minds International School API

Backend API for the public Great Minds International School website. The future student portal is a separate frontend and API client; it is not served from this application.

## Local installation

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and fill in MongoDB, JWT, Cloudinary, and email values.
4. Start development with `npm run dev` or production with `npm start`.

The API runs on `http://localhost:5000` by default.

## Main website API

- `GET /api/health` - service health check
- `GET /api/public/gallery` - published photo gallery
- `POST /api/public/contact-us` - contact form submission
- `POST /api/applicants/signup` - admissions applicant account
- `POST /api/applicants/login` - admissions applicant login
- `POST /api/applicants/verify-payment` - authenticated application payment record
- `POST /api/staff/signup` - staff account request
- `POST /api/staff/login` - approved staff login
- `POST /api/admin/admin-login` - administrator login
- `GET /api/admin/admin-dashboard` - protected dashboard metrics
- `GET /api/admin/messages` - protected contact messages
- `POST /api/gallery` - protected gallery upload (`multipart/form-data`, `image`, `title`)
- `DELETE /api/gallery/:id` - protected gallery deletion

Use `Authorization: Bearer <token>` for protected routes. Admin and staff authentication are separate from applicant authentication.

## Structure

```text
src/
  config/       database, email, Cloudinary
  controllers/  public, admissions, staff, admin, gallery logic
  middleware/   authentication, uploads, rate limiting, Arcjet
  models/       Admin, Applicant, Staff, Gallery, Message
  routes/       public, admissions, staff, admin, gallery endpoints
server.js       Express application and API entry point
seedAdmin.js    one-time administrator provisioning script
```

## Planned phases

1. Build the main website frontend with Home, About Us, Academics, Admissions, Student, Staff, News & Events, Photo Gallery, and Contact Us.
2. Connect the admin dashboard for gallery/content/message management.
3. Add a real payment-provider verification flow for application fees.
4. Build the separate `Great Minds Student Portal` application for student accounts, fees, assignments, tests, and CBT exams.
