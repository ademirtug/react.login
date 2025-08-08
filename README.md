Reusable Authentication Components for React.

> Lightweight React authentication package with JWT support, built-in login form, context provider, and integration with `react-router-dom`.

---

## ✨ Features

- 🔐 JWT-based login and logout
- ⚙️ Token refresh support
- 👤 Context-based user auth state
- 🧠 Auto token storage (local/session)
- 🧾 Built-in Login Form UI
- 🧩 Pluggable endpoints

---

## 📦 Installation

```bash
npm install @selestra11/react.auth
```

---

## 🔧 Peer Dependencies

Make sure you install these along with the package:

```bash
npm install react@^19.0.0 react-dom@^19.0.0 react-router-dom@^7.7.1 jwt-decode
```

---

## 🚀 Usage

### 1. Wrap your app with the `AuthProvider`

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@selestra11/react.auth";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
```

### 2. Use `useAuth` hook anywhere

```jsx
import { useAuth } from "@selestra11/react.auth";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

---

## 🧪 Built-in Login Form

Use the included `SplitLogin` component for a quick login page:

```jsx
import { SplitLogin } from "@selestra11/react.auth";

function LoginPage() {
  return <SplitLogin />;
}
```

> Customize styling via `Login.css`.

---

## ⚙️ Customization

### AuthProvider Props

| Prop             | Type     | Default                          | Description                          |
|------------------|----------|----------------------------------|--------------------------------------|
| `endpoints`      | Object   | `{ login, logout, me, refresh }` | Customize API endpoint URLs |
| `tokenStorageKey`| string   | `"leximo-auth-token"`            | Change token storage key in browser  |

---

## 🧩 API Endpoints

Expected response formats:

### Login (`POST /api/v1/auth/login`)

```json
{
  "token": "jwt_token",
  "user": { "email": "user@example.com" }
}
```

### Me (`GET /api/v1/auth/me`)

Returns current user data from token.

### Refresh (`POST /api/v1/auth/refresh`)

Returns new token.

### Logout (`POST /api/v1/auth/logout`)

Logs the user out.


