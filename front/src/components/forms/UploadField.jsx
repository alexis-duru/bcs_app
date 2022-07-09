import React from 'react';

// UPLOAD FIELD COMPONENT

const UploadField = ({name, value, error, onChange}) => {
    return ( 
        <div className="formGroup">
        <label htmlFor={name}>Choose file to upload</label>
            <input type="file" 
                accept="image/png, image/jpeg"
                onChange={onChange} 
                name={name} 
                value={value} 
                className={"form-control" + (error && " is-invalid")}
            >
            </input>
            <p className="invalid-message">{error}</p>
        </div>
     );
}
 
export default UploadField;