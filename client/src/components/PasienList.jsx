import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../services/api";

const PasienList = ({ onEdit }) => {
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
            <th>Nama Pasien</th>
            <th>Obat</th>
            <th>Keluhan</th>
            <th>Dokter</th>
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
              <td>{product.nama_pasien}</td>
              <td>{product.obat || "-"}</td>
              <td>{product.keluhan || "-"}</td>
              <td>{product.doctor?.nama || "-"}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(product)}
                  disabled={deletingId === product.id}
                  aria-label={`Edit ${product.nama_pasien}`}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  aria-label={`Delete ${product.nama_pasien}`}
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

export default PasienList;
