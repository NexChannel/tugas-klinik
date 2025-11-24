import { useState } from "react";
import ResepForm from "../components/ResepForm";
import ResepList from "../components/ResepList";

const ResepPage = () => {
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleSuccess = () => {
    setSelected(null);
    setRefresh((r) => r + 1);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Manajemen Resep</h2>
      <ResepForm prescription={selected} onSuccess={handleSuccess} />
      <ResepList key={refresh} onEdit={setSelected} />
    </div>
  );
};

export default ResepPage;
