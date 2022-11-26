import { FormInputLabel, Input, Group } from './form-input.styles';

const FormInput = ({ label, ...otherProps }) => {
    return (
        // SF comment - if label exists, "&&" means THEN render this
        <Group>
            <Input {...otherProps} />
            {label && <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>}
        </Group>
    );
};

export default FormInput;
