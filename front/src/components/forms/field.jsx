import React from 'react';


// FIELD FORM COMPONENT

const Field = ({name, label, value, onChange, placeholder, type = "text", error = " "}) => {
    return (  
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input 
                value={value} 
                onChange={onChange}
                type={type}  
                placeholder={placeholder}
                name={name} 
                className={"form-control" + (error && " is-invalid")} 
            />
            {error &&<p className="invalid-message">{error}</p>}
    </div> 
    );
}
 
export default Field;