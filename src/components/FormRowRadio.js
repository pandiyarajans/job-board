import React from 'react';

function FormRowRadio({ type, name, isRequired, handleChange, labelText, value, classes, options }) {
  return (
    <>
    <div className="flex items-center mr-4">
    <label htmlFor={name} className="input_title tracking-wide text-gray-700 text-xs font-bold mb-1 flex gap-1">
    <p>{labelText} </p> {isRequired && <p style={{ color: "#D86161" }}>*</p>}
     </label>
   </div>
    <div className="flex mr-4 mb-4">
      <div className="flex gap-x-4">
        {options?.map((option) => {
          return (
            <div className="flex gap-2">
              <input
                type={type}
                name={name}
                className={classes}
                checked={option.value !== value}
                onChange={handleChange}
                value={option.value}
              />
              <label htmlFor="hs-radio-group-1" className="radio_text">
                {option.text}
              </label>
            </div>
          )
        })}
      </div>
    </div>
    </>
  );
}
export default FormRowRadio;
