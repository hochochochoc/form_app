import "./index.css";
import { Route, Routes } from "react-router-dom";
import ResponsePage from "./pages/responsePage/ResponsePage";
// import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    // <AuthProvider>
    <Routes>
      <Route path="/" element={<ResponsePage />} />
    </Routes>
    // </AuthProvider>
  );
}

export default App;
