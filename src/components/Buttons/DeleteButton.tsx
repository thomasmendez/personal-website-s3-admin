import React from "react";

interface DeleteButtonProps {
  onClick: () => void;
  'data-testid': string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, 'data-testid': dataTestId }) => {

  return (
    <button
      className="bg-red-400 hover:bg-red-300 dark:bg-red-500 dark-hover:bg-red-700 px-1"
      data-testid={dataTestId}
      onClick={() => onClick()}
    >
      -
    </button>
  );
};

export default DeleteButton;
