import { useState, useEffect } from "react";
import { getPatients, deletePatient } from "../services/api";

const PostList = ({ onEdit }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await getPatients();
      setPatients(response.data || []);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah anda ingin menghapus data?")) return;

    setDeletingId(id);
    try {
      await deletePatient(id);
      fetchPatients();
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
          {patients.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
                Tidak ada data
              </td>
            </tr>
          )}

          {patients.map((patient, i) => (
            <tr key={patient.id}>
              <td>{i + 1}</td>
              <td>{patient.nama_pasien}</td>
              <td>{patient.obat || "-"}</td>
              <td>{patient.keluhan || "-"}</td>
              <td>{patient.doctor?.nama || "-"}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(patient)}
                  disabled={deletingId === patient.id}
                  aria-label={`Edit ${patient.nama_pasien}`}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(patient.id)}
                  disabled={deletingId === patient.id}
                  aria-label={`Delete ${patient.nama_pasien}`}
                >
                  {deletingId === patient.id ? "Menghapus..." : "Delete"}
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
