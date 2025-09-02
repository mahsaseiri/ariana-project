# Ariana Project

A modern React-based authentication and dashboard application built with TypeScript, featuring a clean UI and robust state management.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Protected Routes**: Route protection based on authentication status
- **Modern UI**: Clean and responsive design using Tailwind CSS
- **State Management**: Redux Toolkit with persistence for auth state
- **API Integration**: React Query for efficient data fetching and caching
- **Form Validation**: Formik with Yup validation schemas
- **TypeScript**: Full TypeScript support for better development experience

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript 4.9.5
- **Styling**: Tailwind CSS 3.4.17
- **State Management**: Redux Toolkit 2.8.2 + Redux Persist 6.0.0
- **Data Fetching**: React Query (@tanstack/react-query) 5.85.6
- **HTTP Client**: Axios 1.11.0
- **Form Management**: Formik 2.4.6 + Yup 1.7.0
- **Routing**: React Router DOM 7.8.2
- **Build Tool**: Create React App 5.0.1

## 📁 Project Structure

```
src/
├── apis/                 # API service functions
│   ├── _http.ts         # Axios configuration
│   └── auth.ts          # Authentication API calls
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   └── LogoutModal.tsx
├── hooks/              # Custom React hooks
│   └── queries.ts      # React Query hooks
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   └── Register.tsx
├── routes/             # Routing configuration
│   ├── AppRoutes.tsx
│   └── ProtectedRoutes.tsx
├── store/              # Redux store configuration
│   ├── index.ts
│   └── slices/
│       └── authSlice.ts
├── types/              # TypeScript type definitions
│   └── auth.ts
├── validations/        # Form validation schemas
│   └── auth.ts
└── assets/             # Static assets
    └── icons/
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ariana-project
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
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 🔐 Authentication Flow

### Login Process

1. User enters credentials on the login page
2. Form validation using Formik + Yup
3. API call via React Query's `useLogin` hook
4. On success, authentication token is stored in Redux
5. User is redirected to the dashboard
6. Authentication state persists across browser sessions

### Protected Routes

- Dashboard access requires authentication
- Unauthenticated users are redirected to login
- Logout clears authentication state and redirects to login

## 🎨 UI Components

### Core Components

- **Button**: Reusable button component with icon support
- **Input**: Form input component with validation display
- **LogoutModal**: Confirmation modal for logout action

### Styling

- Built with Tailwind CSS for utility-first styling
- Responsive design that works on all screen sizes
- Custom color scheme and design tokens

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory for environment-specific configuration:

```env
REACT_APP_API_BASE_URL=your_api_base_url
```

### API Configuration

The API base URL and headers are configured in `src/apis/_http.ts`. Update this file to match your backend API.

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 📦 Build for Production

Create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the existing issues
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

---

**Happy Coding! 🎉**
