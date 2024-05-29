import React, { ChangeEvent } from 'react';

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, required }) => {
  return (
    <div>
      <input className="border-2 rounded-lg pr-48 pl-2 py-2"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;