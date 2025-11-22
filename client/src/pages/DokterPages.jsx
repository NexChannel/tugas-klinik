import { useState } from "react";
import DokterForm from "../components/DokterForm";
import DokterList from "../components/DokterList";

const DokterPage = () => {
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleSuccess = () => {
    setSelected(null);
    setRefresh((prev) => prev + 1);
  };
  return (
    <div className="container py-4">
      <h2 className="mb-4"> Manajemen Dokter</h2>
      <DokterForm category={selected} onSuccess={handleSuccess} />
      <DokterList key={refresh} onEdit={setSelected} />
    </div>
  );
};

export default DokterPage;
