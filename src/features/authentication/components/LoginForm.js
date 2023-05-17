import useForm from "../../../hooks/useForm";
import FormInput from "../../../components/form/FormInput";
import Button from "../../../components/ui/Button";
import styled from "styled-components";


const LoginForm = ({onSubmit}) => {
    const {values, handleChange, handleSubmit, resetForm} = useForm({
        username: "",
        password: ""
    })

    return (
        <FormStyled onSubmit={(event) => handleSubmit(event, onSubmit)}>
            <div>
                <FormInput
                    label="Username"
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <br/>
            <Button type="submit">Login</Button>
            <Button type="button" onClick={resetForm}>
                Reset
            </Button>
        </FormStyled>
    );

}

const FormStyled = styled.form`
  margin: 0;
  padding: 0;
`

export default LoginForm;