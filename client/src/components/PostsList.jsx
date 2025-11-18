import { useState, useEffect } from "react";
import { getPosts, deletePost } from "../services/api";

const PostList = ({ onEdit }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await getPosts();
      setPosts(response.data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah anda ingin menghapus data?")) return;

    setDeletingId(id);
    try {
      await deletePost(id);
      fetchPosts();
    } catch (error) {
      alert("Gagal menghapus data");
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>NO</th>
            <th>Name</th>
            <th>Email</th>
            <th>Content</th>
            <th>User Email</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {posts.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
                Tidak ada data
              </td>
            </tr>
          )}

          {posts.map((post, i) => (
            <tr key={post.id}>
              <td>{i + 1}</td>
              <td>{post.name}</td>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>{post.User?.email || "-"}</td>

              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(post)}
                  disabled={deletingId === post.id}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(post.id)}
                  disabled={deletingId === post.id}
                >
                  {deletingId === post.id ? "Menghapus..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
