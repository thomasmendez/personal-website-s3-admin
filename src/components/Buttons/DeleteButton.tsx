import React from "react";

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {

  return (
    <button
      className="bg-red-400 hover:bg-red-300 dark:bg-red-500 dark-hover:bg-red-700 px-1"
      onClick={() => onClick()}
    >
      -
    </button>
  );
};

export default DeleteButton;
