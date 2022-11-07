import './form-input.scss';

const FormInput = ({ label, ...otherProps }) => {
    return (
        // if label exists, "&&" means THEN render this
        <div className='group'>
            <input className='form-input' {...otherProps} />
            {label && <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>}
        </div>
    );
};

export default FormInput;
