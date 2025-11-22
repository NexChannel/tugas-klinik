import { useState, useEffect } from "react";
import { createCategory, updateCategory } from "../services/api";

const DokterForm = ({ category, onSuccess }) => {
  const [nama, setNama] = useState("");
  const [spesialisasi, setSpesialisasi] = useState("");
  const [analisa, setAnalisa] = useState("");
  const [nomorHp, setNomorHp] = useState("");

  useEffect(() => {
    if (category) {
      setNama(category.nama || "");
      setSpesialisasi(category.spesialisasi || "");
      setAnalisa(category.analisa || "");
      setNomorHp(category.nomor_hp || "");
    } else {
      setNama("");
      setSpesialisasi("");
      setAnalisa("");
      setNomorHp("");
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nama,
        spesialisasi,
        analisa,
        nomor_hp: nomorHp,
      };
      if (category) {
        await updateCategory(category.id, payload);
      } else {
        await createCategory(payload);
      }
      setNama("");
      setSpesialisasi("");
      setAnalisa("");
      setNomorHp("");
      onSuccess();
    } catch (error) {
      alert("Gagal menyimpan data");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{category ? "Edit" : "Tambah"} Dokter</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nama Dokter</label>
            <input
              type="text"
              className="form-control"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Spesialisasi</label>
            <input
              type="text"
              className="form-control"
              value={spesialisasi}
              onChange={(e) => setSpesialisasi(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Analisa</label>
            <textarea
              className="form-control"
              value={analisa}
              onChange={(e) => setAnalisa(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nomor HP</label>
            <input
              type="text"
              className="form-control"
              value={nomorHp}
              onChange={(e) => setNomorHp(e.target.value)}
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
                setNama("");
                setSpesialisasi("");
                setAnalisa("");
                setNomorHp("");
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

export default DokterForm;
