import React from "react";

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {

  return (
    <button
      className="bg-blue-200 hover:bg-blue-300 dark:bg-gray-500 dark-hover:bg-gray-700 px-1"
      onClick={onClick}
    >
      +
    </button>
  );
};

export default AddButton;
