import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Parent from "./Parent/Index";
import Shop from "./Pages/Shop";
import { AppProvider } from "./Hooks/Context/Contextapi";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Parent />}>
              <Route index element={<Home />} />

              <Route path="/shop" element={<Shop />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
