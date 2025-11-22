import { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../services/api";

const UsersList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error("Gagal fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus user ini?")) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (error) {
        alert("Gagal menghapus");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>No</th>
          <th>Email</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u, i) => (
          <tr key={u.id}>
            <td>{i + 1}</td>
            <td>{u.email}</td>
            <td>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => onEdit(u)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(u.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersList;
