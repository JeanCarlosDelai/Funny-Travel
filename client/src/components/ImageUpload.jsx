import React from 'react';

const ImageUpload = ({ type, name, value, handleChange, labelText }) => {

    return (
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>
                Imagens
            </label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default ImageUpload;