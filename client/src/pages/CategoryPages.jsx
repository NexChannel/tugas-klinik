import {useState} from "react";
import CategoryForm from "../components/CategoryForm";
import CategoryList from "../components/CategoryList";

const CategoryPage = () => {
    const [selected, setSelected] = useState(null);
    const [refresh, setRefresh] =  useState(0);

    const handleSuccess = () => {
        setSelected(null);
        setRefresh((prev) => prev + 1);
    };
    return (
        <div className="container py-4">
            <h2 className="mb-4"> Manajemen Kategori</h2>
            <CategoryForm 
            category={selected} 
            onSuccess={handleSuccess} 
            />
            <CategoryList 
            key={refresh} 
            onEdit={setSelected}     
            />
        </div>
    );
};

export default CategoryPage;