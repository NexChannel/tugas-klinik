import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserPage from "./pages/UserPages";
import PostPage from "./pages/PostPages";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            React CRUD
          </Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/users">
              Users
            </Link>
            <Link className="nav-link" to="/posts">
              Posts
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

        <Route path="/users" element={<UserPage />} />
        <Route path="/posts" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
