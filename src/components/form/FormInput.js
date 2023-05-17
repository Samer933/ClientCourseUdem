import styled from "styled-components";


const FormInput = ({label, type,name, value, onChange, required}) => {
  return (
      <div>
          <TitleDesign>{label}</TitleDesign>
          <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          />
      </div>
  )


};

const TitleDesign = styled.div`
  margin: 10px 0 10px 0;
  background: #0f3a6a;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

`


export default FormInput