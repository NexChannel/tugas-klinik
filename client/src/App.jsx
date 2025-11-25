import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DokterPage from "./pages/DokterPages";
import PasienPage from "./pages/PasienPages";
import ResepPage from "./pages/ResepPages";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            React CRUD
          </Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/dokter">
              Dokter
            </Link>
            <Link className="nav-link" to="/pasien">
              Pasien
            </Link>
            <Link className="nav-link" to="/resep">
              Resep
            </Link>
          </div>
          <div className="ms-auto">
            {localStorage.getItem("auth") === "true" ? (
              <button
                className="btn btn-sm btn-outline-light"
                onClick={() => {
                  localStorage.removeItem("auth");
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dokter"
          element={
            <ProtectedRoute>
              <DokterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pasien"
          element={
            <ProtectedRoute>
              <PasienPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resep"
          element={
            <ProtectedRoute>
              <ResepPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
