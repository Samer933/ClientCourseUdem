import {useState} from "react";

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = (event, onSubmit) => {
        event.preventDefault();
        onSubmit(values);
    }

    const resetForm = () => {
        setValues(initialValues)
    }

    return {
        values,
        handleChange,
        handleSubmit,
        resetForm,
        setValues
    };
}

export default useForm;