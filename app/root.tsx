import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useHref,
} from "react-router"; 

import type { Route } from "./+types/root";
import "./app.css";
import { HeroUIProvider } from "@heroui/react";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children} 
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
const queryClient = new QueryClient();

function AppWithProvider() {
    const navigate = useNavigate();
    const getHref = useHref; 

    return (
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider navigate={navigate} useHref={getHref}>
          <ReactQueryDevtools />
          <main className="text-foreground bg-background min-h-screen">
            <Outlet />
          </main>
        </HeroUIProvider>
      </QueryClientProvider>
    );
}

export default function App() {
  return <AppWithProvider />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = 
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
