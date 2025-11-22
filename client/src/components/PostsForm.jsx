import { useState, useEffect } from "react";
import { createPost, updatePost, getUsers } from "../services/api";

const PostForm = ({ post, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    content: "",
    userId: "",
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load data saat edit
  useEffect(() => {
    if (post) {
      setFormData({
        name: post.name || "",
        title: post.title || "",
        content: post.content || "",
        userId: post.userId || post.UserId || (post.user && post.user.id) || "",
      });
    }
  }, [post]);

  // Ambil data user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        name: formData.name,
        title: formData.title,
        content: formData.content,
        UserId: Number(formData.userId),
      };

      post ? await updatePost(post.id, data) : await createPost(data);

      setFormData({ name: "", title: "", content: "", userId: "" });
      onSuccess();
    } catch (err) {
      alert("Gagal menyimpan data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{post ? "Edit" : "Tambah"} Post</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Nama</label>
            <input
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Content</label>
            <input
              className="form-control"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>User</label>
            <select
              className="form-select"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
            >
              <option value="">Pilih User</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.email}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
