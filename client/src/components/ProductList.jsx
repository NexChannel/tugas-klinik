import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../services/api";

const ProductList = ({ onEdit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah anda ingin menghapus data?")) return;

    setDeletingId(id);
    try {
      await deleteProduct(id);
      fetchProducts();
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
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
                Tidak ada data
              </td>
            </tr>
          )}
          {products.map((product, i) => (
            <tr key={product.id}>
              <td>{i + 1}</td>
              <td>{product.name}</td>
              <td>Rp {product.price.toLocaleString("id-ID")}</td>
              <td>{product.stock}</td>
              <td>{product.category?.title || "-"}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(product)}
                  disabled={deletingId === product.id}
                  aria-label={`Edit ${product.name}`}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  aria-label={`Delete ${product.name}`}
                >
                  {deletingId === product.id ? "Menghapus..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
