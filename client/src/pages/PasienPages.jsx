import { useState } from "react";
import PasienForm from "../components/PasienForm";
import PasienList from "../components/PasienList";

const PasienPage = () => {
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleSuccess = () => {
    setSelected(null);
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Manajemen Pasien</h2>
      <PasienForm patient={selected} onSuccess={handleSuccess} />
      <PasienList key={refresh} onEdit={setSelected} />
    </div>
  );
};

export default PasienPage;
