import React from "react";

interface EditButtonProps {
  onClick: () => void;
  'data-testid': string;
}

{/* https://emojipedia.org/ */}
const EditButton: React.FC<EditButtonProps> = ({ onClick, 'data-testid': dataTestId }) => {

  return (
    <button
      className="after:content-['\0270F']" 
      data-testid={dataTestId}
      onClick={onClick}
    >
    </button>
  );
};

export default EditButton;
