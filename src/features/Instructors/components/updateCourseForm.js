import useForm from "../../../hooks/useForm";
import FormInput from "../../../components/form/FormInput";
import Button from "../../../components/ui/Button";
import Dropdown from "react-bootstrap/Dropdown";
import {useState} from "react";
import styled from "styled-components";

const UpdateCourseForm = ({onSubmit}) => {
    const {values, handleSubmit, handleChange, resetForm, setValues} = useForm({
        title: "",
        description:"",
        subject:"Development"
    });

    const [selectedSubject, setSelectedSubject] = useState('Development');
    const handleSubjectSelect = (eventKey) => {
        const {value} = eventKey.target


        setSelectedSubject(value);
        setValues({
            ...values,
            subject: value || "Development"
        });
    };


    return (
        <form onSubmit={(event) => handleSubmit(event, onSubmit)}>
            <div>
                <FormInput
                    label="Title"
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <FormInput
                    label="Description"
                    type="text"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <CustomSelect value={selectedSubject} onChange={handleSubjectSelect} required>
                    <option value="Development">Development</option>
                    <option value="Art">Art</option>
                    <option value="Business">Business</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Music">Music</option>
                    <option value="Teaching">Teaching</option>
                    <option value="Lifestyle">Lifestyle</option>
                </CustomSelect>
            </div>
            <Button type="submit">Update course</Button>
            <Button type="button" onClick={resetForm}>
                Reset
            </Button>
        </form>
    );
}

export default UpdateCourseForm;

const CustomSelect = styled.select`
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #0F3A6A;
  background-color: rgba(91, 192, 190, 0.2);
  color: #0F3A6A;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  margin-right: 20px;
  margin-bottom: 20px;
  margin-top: 20px;

  &:hover {
    background-color: rgba(91, 192, 190, 0.4);
  }

  &:focus {
    border: 1px solid rgba(15, 58, 106, 0.8);
  }

  option {
    background-color: #ffffff;
    color: #0F3A6A;
  }
`