import styled from "styled-components";

const Button = ({onClick, children}) => {
    return (
        <ButtonStyled onClick={onClick}>
            {children}
        </ButtonStyled>
    )
}

const ButtonStyled = styled.button`
  margin-right: 0.5rem;
  margin-bottom: 20px;
  margin-top: 20px;
  color: white;
  background-color: #0f3a6a;

  transition: all 0.3s ease;

  &:hover {
    border-color: #b0b0b0;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);

`

export default Button