import { ChangeEventHandler } from 'react';

interface Props {
  label?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value?: boolean;
}

export default function Switch({ label, onChange, value }: Props) {
  return (
    <div className="flex items-center justify-center w-full mb-12">
      <label htmlFor="toogleA" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toogleA"
            type="checkbox"
            className="sr-only"
            onChange={onChange}
            checked={value}
          />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner" />
          <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition" />
        </div>
        <div className="ml-3 text-gray-700 font-medium">{label}</div>
      </label>
    </div>
  );
}
