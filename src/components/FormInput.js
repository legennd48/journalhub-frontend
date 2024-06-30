// FormInput.js
import React from 'react';
import PropTypes from 'prop-types';
import './FormInput.css'; // Add your custom styles here

const FormInput = ({ type, name, placeholder, value, onChange, error }) => {
    return (
        <div className="form-input">
            <label htmlFor={name}>{placeholder}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {error && <p className="error">{error}</p>}
        </div>
    );
};

FormInput.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default FormInput;
