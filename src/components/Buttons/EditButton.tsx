import React from "react";

interface EditButtonProps {
  onClick: () => void;
}

{/* https://emojipedia.org/ */}
const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {

  return (
    <button
      className="after:content-['\0270F']" 
      onClick={onClick}
    >
    </button>
  );
};

export default EditButton;
