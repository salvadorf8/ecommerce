import { FormInputLabel, Input, Group } from './form-input.styles';
// import './form-input.scss';

const FormInput = ({ label, ...otherProps }) => {
    return (
        // if label exists, "&&" means THEN render this
        <Group>
            <Input {...otherProps} />
            {label && <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>}
        </Group>
    );
};

export default FormInput;
