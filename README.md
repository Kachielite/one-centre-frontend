# One Center Frontend

A modern React application built with TypeScript, Vite, and shadcn/ui.

## 🚀 Technologies

- **React 19**: Modern UI library with concurrent rendering support.
- **Vite**: High-performance frontend build tool.
- **TypeScript**: Static typing for enhanced developer experience.
- **shadcn/ui**: Accessible and customizable UI components.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **React Router Dom 7**: Client-side routing with loaders and protected routes.
- **Zustand**: Lightweight and scalable state management.
- **React Query**: Powerful asynchronous state management and data fetching.
- **React Hook Form & Zod**: Robust form handling and validation.

## 📂 Project Structure

The project follows a modular structure, separating shared core logic from feature-specific domains.

```
src/
├── core/               # Shared logic, components, and utilities
│   ├── assets/         # Static assets like images and icons
│   ├── components/     # Shared UI components, layouts, and providers
│   │   ├── ui/         # Base shadcn/ui components
│   │   ├── custom-components/ # Custom shared components
│   │   └── layout/     # Application layouts (Auth, Dashboard)
│   ├── constants/      # Shared constants and configuration
│   ├── lib/            # External library configurations (axios, etc.)
│   ├── route/          # Routing configuration and route utilities
│   ├── types/          # Shared TypeScript interfaces and types
│   └── utils/          # Global helper functions
└── feature/            # Feature-based domain logic
    └── auth/           # Authentication feature
        ├── components/ # Feature-specific components
        ├── hooks/      # Feature-specific custom hooks
        ├── pages/      # Feature-specific route pages
        ├── service/    # Feature-specific API services
        ├── state/      # Feature-specific state management (Zustand)
        └── types/      # Feature-specific types and DTOs
```

## 🛣️ Routing Implementation

Routing is centralized in `src/core/route/index.tsx` using `react-router-dom`. It utilizes:

- **Layouts**: Nested routes are wrapped in layouts (e.g., `DashboardLayout`, `AuthLayout`).
- **Loaders**: Route-level data loading and access control.
  - `protectedLoader`: Ensures only authenticated users can access specific routes.
  - `publicOnlyLoader`: Prevents authenticated users from accessing public pages like Login or Register.
- **Error Boundaries**: Centralized error handling using `ErrorPage`.

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## 🧩 Adding Components

To add new shadcn/ui components, run:

```bash
npx shadcn@latest add [component-name]
```

This will place the components in `src/core/components/ui`.
