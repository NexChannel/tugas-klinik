import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DokterPage from "./pages/DokterPages";
import PasienPage from "./pages/PasienPages";

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
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="container py-5 text-center">
              <h1>Selamat Datang</h1>
              <p className="lead">Silahkan pilih menu</p>
            </div>
          }
        />
        <Route path="/dokter" element={<DokterPage />} />
        <Route path="/pasien" element={<PasienPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
