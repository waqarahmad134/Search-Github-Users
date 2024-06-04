import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./errors/error-page";
import { ToastContainer } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div>
      <ToastContainer />
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
