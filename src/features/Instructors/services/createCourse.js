import CourseForm from "../components/CourseForm";
import useCreateCourse from "../hooks/useCreateCourse";

const CreateCourse = () => {

    const {createCourse, error, isLoading} = useCreateCourse();

    if (isLoading) return <p>Loading course creation</p>

    if (error) return <p>Error course creation</p>

    return (
        <div>
            <h2>Create a course</h2>
            <CourseForm onSubmit={createCourse}/>
        </div>
    )
}

export default CreateCourse;