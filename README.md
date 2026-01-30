# QR Attendance Scanner

A real-time QR code attendance tracking system with React frontend and Django backend.

## Project Structure

- **Frontend**: React with Next.js (v16) - located in `/app` and `/components`
- **Backend**: Django REST API - located in `/scanner` and `/scanner_project`

## Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- html5-qrcode for QR scanning

### Backend
- Django 4.2
- SQLite/PostgreSQL
- Django REST Framework (via custom views)
- django-cors-headers for CORS support

## Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run Django migrations:
```bash
python manage.py migrate
```

3. Start the Django development server:
```bash
python manage.py runserver
```

The Django API will be available at `http://localhost:8000`

### Frontend Setup

1. Install Node dependencies:
```bash
npm install
```

2. Start the Next.js development server:
```bash
npm run dev
```

The React app will be available at `http://localhost:3000`

## Features

### Scanner Page (`/`)
- Real-time QR code scanning using device camera
- Instant attendance marking
- Real-time stats (Total Registered, Present, Absent)
- Recent attendees list with check-in times
- Status indicators for scan results (success, already marked, not registered, error)
- Responsive design with smooth animations

### Admin Dashboard (`/admin`)
- View all attendees with registration numbers
- Filter by attendance status (Present/Absent)
- Sort by registration number
- Export attendance data
- Beautiful data table with real-time updates

## API Endpoints

### Scan QR Code
```
POST /scan/
Body: registration_number (string)
Response: {
  "status": "success" | "already_marked" | "not_registered" | "error",
  "name": string,
  "registration_number": string,
  "message": string
}
```

### Get Statistics
```
GET /api/stats/
Response: {
  "total_registered": number,
  "present": number,
  "absent": number
}
```

### Get Attendees
```
GET /api/attendees/
Response: {
  "attendees": [
    {
      "id": number,
      "registration_number": string,
      "name": string,
      "attended": boolean,
      "checked_in_at": datetime | null
    }
  ]
}
```

### Get Admin Attendees
```
GET /admin/attendees/
Response: HTML table with all attendees
```

### Download CSV
```
GET /download-present/
Response: CSV file with present attendees
```

## Environment Variables

Create a `.env` file in the project root:

```
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=postgresql://user:password@localhost/scanner_db
```

## Database Models

### Attendee
- `registration_number` (CharField, unique)
- `name` (CharField)
- `attended` (BooleanField, default=False)
- `checked_in_at` (DateTimeField, nullable)

## Development

### Frontend Architecture
- Page-level components in `/app`
- Reusable components in `/components`
- Server-side API integration with client-side state management
- Real-time data fetching with polling

### Backend Architecture
- Models in `/scanner/models.py`
- Views in `/scanner/views.py`
- URLs in `/scanner/urls.py`
- Database in `/db.sqlite3`

## Deployment

### Frontend (Vercel)
```bash
npm run build
# Push to GitHub and deploy via Vercel
```

### Backend (Render)
The project includes `render.yaml` for Render deployment.

## License

MIT License

## Support

For issues and questions, please open an issue in the GitHub repository.
