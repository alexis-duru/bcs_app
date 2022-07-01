import React from 'react';

const Select = ({name, value, error, label, onChange, children, category, type, flat}) => {
    return ( 
        <div className="formGroup">
        <label htmlFor={name}>{label}</label>
        <option value="">--Select a {category}{type}{flat}--</option>
            <select 
                onChange={onChange} 
                name={name} 
                id={name}
                value={value} 
                className={"form-control" + (error && " is-invalid")}
            >
            {children}
            </select>
            <p className="invalid-message">{error}</p>
        </div>
     );
}
 
export default Select;