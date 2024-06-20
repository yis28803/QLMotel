import React, { useState } from "react";

const InputFiltering = (props) => {
  const option = props.option;
  const [checked, setChecked] = useState(false);

  const style =
    "px-2 py-1 rounded-md mx-2 bg-[#1AACAC] border-[1px] text-white hover:cursor-pointer";
  function handleChange(event) {
    if (event.target.checked) {
      setChecked(true);
      props.changeSelect((prev) => {
        return prev.add(event.target.value);
      });
    } else {
      setChecked(false);
      props.changeSelect((prev) => {
        prev.delete(event.target.value);
        return prev;
      });
    }
  }

  return (
    <div className="inline-block mt-[1%] group">
      <label
        className={
          checked
            ? style
            : "px-2 py-1 border-[1px] border-[#1AACAC] rounded-md mx-2 hover:cursor-pointer"
        }
        htmlFor={option}
      >
        {option}
      </label>
      <input
        onChange={handleChange}
        className="w-0"
        id={option}
        type="checkbox"
        value={option}
      />
    </div>
  );
};

export default InputFiltering;
