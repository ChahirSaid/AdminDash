import { BsTrash } from "react-icons/bs";

const AreaTableAction = ({ orderId, handleDelete }) => {
  const handleClickDelete = () => {
    handleDelete(orderId);
  };

  return (
    <button
      type="button"
      className="action-dropdown-btn"
      onClick={handleClickDelete}
    >
      <BsTrash size={18} />
    </button>
  );
};

export default AreaTableAction;
