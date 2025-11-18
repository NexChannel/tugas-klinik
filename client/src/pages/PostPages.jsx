import { useState } from "react";
import PostForm from "../components/PostsForm";
import PostList from "../components/PostsList";

const PostPage = () => {
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleSuccess = () => {
    setSelected(null);
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Manajemen Posts</h2>

      <PostForm post={selected} onSuccess={handleSuccess} />

      <PostList key={refresh} onEdit={setSelected} />
    </div>
  );
};

export default PostPage;
