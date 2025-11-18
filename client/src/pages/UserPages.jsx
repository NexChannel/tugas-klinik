import { useState } from "react";
import UsersForm from "../components/UsersForm";
import UsersList from "../components/UsersList";

const UserPage = () => {
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleSuccess = () => {
    setSelected(null);
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Manajemen Users</h2>

      <UsersForm user={selected} onSuccess={handleSuccess} />

      <UsersList key={refresh} onEdit={setSelected} />
    </div>
  );
};

export default UserPage;
