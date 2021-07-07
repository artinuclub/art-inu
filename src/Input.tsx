import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  hasMax?: boolean;
  onMax?: () => void;
}

const Input: React.FC<Props> = ({ hasMax = false, onMax, ...props }) => {
  return (
    <input
      className="px-3 py-3 placeholder-blueGray-300 text-black relative bg-gray-50 rounded text-sm border border-0 shadow outline-none focus:outline-none focus:ring w-full"
      {...props}
    />
  );
};

export default Input;
