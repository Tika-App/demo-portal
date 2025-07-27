# Tika Admin Portal

A modern React-based admin portal for document management with comprehensive user management, file uploads, audit logging, and reporting capabilities.

## Features

### 🔐 Authentication
- Secure login with email/password
- Two-factor authentication (2FA) support
- Session management
- Password reset functionality

### 📊 Dashboard
- KPI summary cards (Total Users, Uploads, Most Active User)
- Real-time activity feed
- Filterable by date range and action type
- Modern card-based layout

### 👥 User Management
- Comprehensive user listing with search and filters
- Bulk user selection and actions
- User status management (Active/Inactive)
- Sortable by name, recent activity, and document count
- Pagination support

### 📁 Upload Entry
- Multi-user document assignment
- Drag & drop file upload
- File type validation (PDF, DOC, DOCX, XLS, XLSX)
- File size limits (10MB)
- Category tagging
- Real-time validation and error handling

### 📋 My Uploads
- Personal document management
- Advanced filtering (User, Category, Date)
- File preview and download
- Edit and delete capabilities
- Sortable table view

### 🔍 Audit Log
- Comprehensive activity tracking
- Filterable by date, action type, and controller
- Export functionality (CSV, PDF)
- IP address tracking
- Detailed action history

### 📈 Reports
- Uploads by Controller (bar chart visualization)
- Active Users listing
- Monthly Upload Trends with trend indicators
- Export capabilities for all reports
- Summary statistics

### 👤 Profile Management
- Editable profile information
- Activity summary
- Security settings (2FA toggle)
- Password change functionality
- Account management options

## Technology Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Date-fns** - Date manipulation utilities
- **Mock Data** - Comprehensive sample data for demonstration

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tika-admin-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Demo Credentials

For testing the application, use these demo credentials:

- **Email:** `admin@tika.com`
- **Password:** `password`
- **2FA Code:** `123456`

## Project Structure

```
src/
├── components/          # React components
│   ├── Login.js        # Authentication component
│   ├── Dashboard.js    # Main dashboard
│   ├── UserManagement.js # User management interface
│   ├── UploadEntry.js  # File upload functionality
│   ├── MyUploads.js    # Personal uploads management
│   ├── AuditLog.js     # Audit trail interface
│   ├── Reports.js      # Analytics and reporting
│   ├── Profile.js      # User profile management
│   └── Layout.js       # Main layout wrapper
├── data/
│   └── mockData.js     # Mock data for demonstration
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Key Features Implementation

### Modern UI/UX
- Clean, professional design with Tailwind CSS
- Responsive layout for all screen sizes
- Consistent color scheme and typography
- Interactive hover states and transitions
- Loading states and error handling

### Data Management
- Comprehensive mock data structure
- Realistic sample data for all features
- Proper data filtering and sorting
- Pagination support where applicable

### Security Features
- 2FA implementation with verification codes
- Secure authentication flow
- Role-based access control structure
- Audit logging for all actions

### File Management
- Drag & drop file upload
- File type validation
- Size limit enforcement
- Progress indicators
- Error handling for invalid files

## Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by:

1. Modifying `tailwind.config.js` for theme changes
2. Updating `src/index.css` for custom component styles
3. Adding new utility classes as needed

### Data
To integrate with real APIs:

1. Replace mock data calls in components with actual API calls
2. Update the data structure in `src/data/mockData.js`
3. Implement proper error handling for API responses
4. Add loading states for async operations

### Authentication
To implement real authentication:

1. Replace mock authentication in `src/App.js`
2. Integrate with your authentication service
3. Implement proper session management
4. Add JWT token handling if required

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## Browser Support

The application is built with modern web standards and supports:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository or contact the development team.

---

**Note:** This is a demonstration application with mock data. For production use, replace mock implementations with real API integrations and add proper security measures. 