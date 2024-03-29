import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

const AreaTableAction = ({ orderId, handleDelete, closeDropdown }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
    closeDropdown();
  };

  const handleClickDelete = () => {
    handleDelete(orderId);
    setShowDropdown(false);
  };

  return (
    <>
      <button
        type="button"
        className="action-dropdown-btn"
        onClick={handleDropdown}
      >
        <HiDotsHorizontal size={18} />
        {showDropdown && (
          <div className="action-dropdown-menu">
            <ul className="dropdown-menu-list">
              <li className="dropdown-menu-item">
                <button className="dropdown-menu-link" onClick={handleClickDelete}>
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </button>
    </>
  );
};

export default AreaTableAction;