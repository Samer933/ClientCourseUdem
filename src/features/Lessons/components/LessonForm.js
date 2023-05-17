import React from 'react';
import useForm from "../../../hooks/useForm";
import FormInput from "../../../components/form/FormInput";
import Button from "../../../components/ui/Button";

const LessonForm = ({onSubmit}) => {
    const {values, handleSubmit, handleChange, resetForm} = useForm({
        title: "",
        description: ""
    });

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
           <Button type="submit">Create lesson</Button>
           <Button type="button" onClick={resetForm}>
               Reset
           </Button>
       </form>
    );
};

export default LessonForm;
