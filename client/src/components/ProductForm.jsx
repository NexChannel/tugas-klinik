import { useState, useEffect } from "react";
import { createProduct, updateProduct, getCategories } from "../services/api";

const ProductForm = ({ product, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    CategoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load product data when editing
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        stock: product.stock || "",
        CategoryId: product.CategoryId || "",
      });
    }
  }, [product]);

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        ...formData,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock),
        CategoryId: parseInt(formData.CategoryId),
      };

      if (product) {
        await updateProduct(product.id, data);
      } else {
        await createProduct(data);
      }

      setFormData({ name: "", price: "", stock: "", CategoryId: "" });
      onSuccess(); // Close modal or refresh list
    } catch (error) {
      alert("Gagal menyimpan data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", price: "", stock: "", CategoryId: "" });
    if (product) onSuccess(); // Close edit mode
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{product ? "Edit" : "Tambah"} Produk</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nama</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Stok</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Harga</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Kategori</label>
            <select
              name="CategoryId"
              className="form-select"
              value={formData.CategoryId}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Kategori</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          {product && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={handleCancel}
              disabled={loading}
            >
              Batal
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
