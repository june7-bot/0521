import { useState, useEffect } from 'react';

export interface changeProps {
  name: string;
  value: string;
}

interface inputProps {
  name: string;
  type: string;
  change: (test: changeProps) => void;
  placeholder: string;
}
function InputBox(props: inputProps) {
  const [input, setInput] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInput(value);
  }

  useEffect(() => {
    props.change({ name: props.name, value: input });
  }, [input]);

  return (
    <input
      onChange={handleChange}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}
export default InputBox;
