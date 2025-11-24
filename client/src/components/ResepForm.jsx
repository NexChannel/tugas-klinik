import { useState, useEffect } from "react";
import {
  createPrescription,
  updatePrescription,
  getDoctors,
} from "../services/api";

const ResepForm = ({ prescription, onSuccess }) => {
  const [form, setForm] = useState({
    tanggal: "",
    obat1: "",
    obat2: "",
    obat3: "",
    obat4: "",
    nama_pasien: "",
    tanggal_lahir: "",
    alamat: "",
    DoctorId: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prescription) {
      setForm({
        tanggal: prescription.tanggal ? prescription.tanggal.split("T")[0] : "",
        obat1: prescription.obat1 || "",
        obat2: prescription.obat2 || "",
        obat3: prescription.obat3 || "",
        obat4: prescription.obat4 || "",
        nama_pasien: prescription.nama_pasien || "",
        tanggal_lahir: prescription.tanggal_lahir
          ? prescription.tanggal_lahir.split("T")[0]
          : "",
        alamat: prescription.alamat || "",
        DoctorId: prescription.DoctorId || "",
      });
    } else {
      setForm({
        tanggal: "",
        obat1: "",
        obat2: "",
        obat3: "",
        obat4: "",
        nama_pasien: "",
        tanggal_lahir: "",
        alamat: "",
        DoctorId: "",
      });
    }
  }, [prescription]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getDoctors();
        setDoctors(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        DoctorId: form.DoctorId ? parseInt(form.DoctorId) : null,
      };
      if (prescription) await updatePrescription(prescription.id, payload);
      else await createPrescription(payload);
      onSuccess();
      setForm({
        tanggal: "",
        obat1: "",
        obat2: "",
        obat3: "",
        obat4: "",
        nama_pasien: "",
        tanggal_lahir: "",
        alamat: "",
        DoctorId: "",
      });
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan resep");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{prescription ? "Edit" : "Tambah"} Resep</h5>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Nama Dokter</label>
              <select
                name="DoctorId"
                className="form-select"
                value={form.DoctorId}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Dokter</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Tanggal</label>
              <input
                type="date"
                name="tanggal"
                className="form-control"
                value={form.tanggal}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Daftar Obat (maks 4)</label>
            <input
              name="obat1"
              value={form.obat1}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Obat 1"
            />
            <input
              name="obat2"
              value={form.obat2}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Obat 2"
            />
            <input
              name="obat3"
              value={form.obat3}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Obat 3"
            />
            <input
              name="obat4"
              value={form.obat4}
              onChange={handleChange}
              className="form-control"
              placeholder="Obat 4"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nama Pasien</label>
            <input
              name="nama_pasien"
              value={form.nama_pasien}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Tanggal Lahir</label>
              <input
                type="date"
                name="tanggal_lahir"
                value={form.tanggal_lahir}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Alamat</label>
              <input
                name="alamat"
                value={form.alamat}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          {prescription && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => onSuccess()}
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

export default ResepForm;
