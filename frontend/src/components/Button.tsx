import React from 'react';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button className='border-2 border-black bg-black text-white px-40 py-2 rounded-xl'
    onClick={onClick}>{label}</button>
  );
};

export default Button;
