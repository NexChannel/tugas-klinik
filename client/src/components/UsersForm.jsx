import { useState, useEffect } from "react";
import { createUser, updateUser } from "../services/api";

const UsersForm = ({ user, onSuccess }) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        await updateUser(user.id, { email });
      } else {
        await createUser({ email });
      }

      setEmail("");
      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{user ? "Edit User" : "Tambah User"}</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Simpan
          </button>

          {user && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEmail("");
                onSuccess();
              }}
            >
              Batal
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UsersForm;
