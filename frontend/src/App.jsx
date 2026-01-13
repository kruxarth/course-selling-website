import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AppLayout } from "./layouts/AppLayout";
import { Dashboard } from "./pages/Dashboard";
import { Courses } from "./pages/Courses";
import { Settings } from "./pages/Settings";

function RootLayout() {
  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      // Routes that should have the sidebar layout.
      {
        path: "app",
        element: <AppLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "courses", element: <Courses /> },
          { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}