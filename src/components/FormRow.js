import React from 'react';

function FormRow({ type, name, handleChange, labelText, value, classes, placeholderText, widthType, isRequired }) {
  return (
    <>
      {widthType === "full" ?
        <div className="flex flex-wrap mb-3">
          <label htmlFor={name} className="input_title tracking-wide mb-1 text-gray-700 text-xs font-bold flex gap-1">
            <p>{labelText} </p> { isRequired && <p style={{ color: "#D86161" }}>*</p>}
          </label>
          <input className={classes} id={name} onChange={handleChange} type={type}
            placeholder={labelText} name={name} value={value} />
        </div> :
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label htmlFor={name}
            className="input_title tracking-wide text-gray-700 text-xs font-bold mb-1 flex gap-1">
            <p>{labelText || '\u00A0'} </p> {isRequired && <p style={{ color: "#D86161" }}>*</p> }
          </label>
          <input
            className={classes}
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholderText}
          />
        </div>
      }
    </>
  );
}

export default FormRow;
