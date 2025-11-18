import { useState, useEffect } from "react";
import { createCategory, updateCategory } from "../services/api";

const CategoryForm = ({ category, onSuccess }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (category) {
      setTitle(category.title);
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (category) {
        await updateCategory(category.id, { title });
      } else {
        await createCategory({ title });
      }
      setTitle("");
      onSuccess();
    } catch (error) {
      alert("Gagal menyimpan data");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{category ? "Edit" : "Tambah"} Kategori</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
          {category && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setTitle("");
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

export default CategoryForm;
