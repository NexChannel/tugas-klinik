import { useState, useEffect } from "react";
import { getDoctors, deleteDoctor } from "../services/api";

const DokterList = ({ onEdit }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await getDoctors();
      setDoctors(response.data || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah anda ingin menghapus data?")) return;
    try {
      await deleteDoctor(id);
      fetchDoctors();
    } catch (error) {
      alert("Gagal menghapus data");
    }
  };

  if (loading) return <div className="text-center">Loading..</div>;

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nama Dokter</th>
            <th>Spesialisasi</th>
            <th>Analisa</th>
            <th>Nomor HP</th>
            <th>Jumlah Pasien</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, i) => (
            <tr key={doctor.id}>
              <td>{i + 1}</td>
              <td>{doctor.nama}</td>
              <td>{doctor.spesialisasi || "-"}</td>
              <td>{doctor.analisa || "-"}</td>
              <td>{doctor.nomor_hp || "-"}</td>
              <td>{doctor.patients?.length || 0}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(doctor)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(doctor.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DokterList;
