
import {useParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch";


const LessonList = () => {

    const {id} = useParams()

    const {data, error, isLoading} = useFetch(`https://mernstacktestserver.onrender.com/lessons/${id}/`)

    if (isLoading) return <p>Loading lessons...</p>

    if (error) return <p>Error loading lessons</p>


    return (
        <div>
            <h2>Lesson List</h2>
                {data && data.map((lesson) => (
                    <div key={lesson._id}>
                        <h3>Lesson title: {lesson.title}</h3>
                        <p>Image</p>
                        {lesson.thumbnailUrl && (
                            <img src={lesson.thumbnailUrl} alt={lesson.title} />
                        )}
                        <p>Video</p>
                        {lesson.videoUrl && (
                            <video controls>
                                <source src={lesson.videoUrl} type={lesson.mimeType} />
                            </video>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default LessonList;
