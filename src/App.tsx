import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Parent from "./Parent/Index";
import Shop from "./Pages/Shop";
import { AppProvider } from "./Hooks/Context/Contextapi";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./Component/CoomonComponent/ErrorBoundary/ErrorFallBack";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AppProvider>
        <BrowserRouter>
          <Routes>
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
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
