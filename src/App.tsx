import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Parent from "./Parent/Index";
import Shop from "./Pages/Shop";
import { AppProvider } from "./Hooks/Context/Contextapi";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./Component/CoomonComponent/ErrorBoundary/ErrorFallBack";
import Product from "./Pages/Product";
import Login from "./Authentication/Login";
import SignUpForm from "./Authentication/Signup";
import CheckoutForm from "./Pages/CheckoutForm";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<Login />} />
            <Route element={<Parent />}>
              <Route
                index
                element={
                  <ErrorBoundary FallbackComponent={ErrorFallBack}>
                    <Home />
                  </ErrorBoundary>
                }
              />

              <Route
                path="/shop"
                element={
                  <ErrorBoundary FallbackComponent={ErrorFallBack}>
                    <Shop />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/Product/:slug"
                element={
                  <ErrorBoundary FallbackComponent={ErrorFallBack}>
                    <Product />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ErrorBoundary FallbackComponent={ErrorFallBack}>
                    <CheckoutForm/>
                  </ErrorBoundary>
                }
              />

              <Route
                path="*"
                element={
                  <div className="flex justify-center items-center h-screen">
                    <h2 className="text-3xl font-bold">404 - Page Not Found</h2>
                  </div>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
