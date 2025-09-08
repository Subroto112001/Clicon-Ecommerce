
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from "./Pages/Home"
import {
 
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Parent from './Parent/Index';
import Shop from './Pages/Shop';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route  element={<Parent />}>
            <Route index element={<Home />} />
            <Route path='/shop' element={<Shop />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App 