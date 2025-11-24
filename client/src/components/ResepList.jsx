import { useState, useEffect } from "react";
import { getPrescriptions, deletePrescription } from "../services/api";

const ResepList = ({ onEdit }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getPrescriptions();
      setPrescriptions(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus resep ini?")) return;
    setDeletingId(id);
    try {
      await deletePrescription(id);
      fetch();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus");
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
            <th>Dokter</th>
            <th>Tanggal</th>
            <th>Nama Pasien</th>
            <th>Tgl Lahir</th>
            <th>Obat</th>
            <th>Alamat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center">
                Tidak ada data
              </td>
            </tr>
          )}
          {prescriptions.map((p, i) => (
            <tr key={p.id}>
              <td>{i + 1}</td>
              <td>{p.doctor?.nama || "-"}</td>
              <td>{p.tanggal ? p.tanggal.split("T")[0] : "-"}</td>
              <td>{p.nama_pasien}</td>
              <td>{p.tanggal_lahir ? p.tanggal_lahir.split("T")[0] : "-"}</td>
              <td>
                {p.obat1 || ""}
                {p.obat2 ? ", " + p.obat2 : ""}
                {p.obat3 ? ", " + p.obat3 : ""}
                {p.obat4 ? ", " + p.obat4 : ""}
              </td>
              <td>{p.alamat || "-"}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(p.id)}
                  disabled={deletingId === p.id}
                >
                  {deletingId === p.id ? "Menghapus..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResepList;
