import { useState, useEffect } from "react";
import { createProduct, updateProduct, getCategories } from "../services/api";

const PasienForm = ({ product, onSuccess }) => {
  const [formData, setFormData] = useState({
    nama_pasien: "",
    obat: "",
    keluhan: "",
    DoctorId: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        nama_pasien: product.nama_pasien || "",
        obat: product.obat || "",
        keluhan: product.keluhan || "",
        DoctorId: product.DoctorId || "",
      });
    }
  }, [product]);

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
        DoctorId: parseInt(formData.DoctorId),
      };

      if (product) {
        await updateProduct(product.id, data);
      } else {
        await createProduct(data);
      }

      setFormData({ nama_pasien: "", obat: "", keluhan: "", DoctorId: "" });
      onSuccess();
    } catch (error) {
      alert("Gagal menyimpan data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ nama_pasien: "", obat: "", keluhan: "", DoctorId: "" });
    if (product) onSuccess();
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">
          {product ? "Edit" : "Tambah"} Detail Pasien
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nama Pasien</label>
            <input
              type="text"
              className="form-control"
              name="nama_pasien"
              value={formData.nama_pasien}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Keluhan</label>
            <textarea
              className="form-control"
              name="keluhan"
              value={formData.keluhan}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Obat</label>
            <input
              type="text"
              className="form-control"
              name="obat"
              value={formData.obat}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Dokter</label>
            <select
              name="DoctorId"
              className="form-select"
              value={formData.DoctorId}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Dokter</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nama}
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

export default PasienForm;
