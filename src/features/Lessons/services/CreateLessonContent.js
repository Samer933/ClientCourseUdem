import React, {useEffect, useState} from 'react';
import usePostRequest from "../../../hooks/usePostRequest";
import {useParams} from "react-router-dom";
import LessonForm from "../components/LessonForm";
import Button from "../../../components/ui/Button";
import axios from "axios";
import DeleteConfirmation from "../../../hooks/DeleteConfirmation";
import useDeleteRequest from "../../../hooks/useDeleteRequest";
import AddLessonContent from "./AddLessonContent";
import styled from "styled-components";

const CreateLessonContent = () => {
    const {id} = useParams();

    const [lessons, setLesson] = useState([]);
    const [lessonId, setLessonId] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showAddContent, setShowAddContent] = useState(false);

    const {error, isLoading, handlePost} = usePostRequest(`/lessons/${id}/createLessons`);
    const {handleDelete} = useDeleteRequest(`/lessons/delete/${lessonId}`)

    const fetchLesson = async () => {
        try {
            const res = await axios.get(`/lessons/getAll/${id}`);
            setLesson(res.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchLesson();
    }, []);

    const postRequest = async (values) => {
        await handlePost(values)
        await fetchLesson();
    }
    const handleDeleteClick = (lessonId) => {
        setLessonId(lessonId);
        setShowDeleteConfirmation(true);
    };
    const handleDeleteConfirm = async () => {
        // Handle delete logic here
        await handleDelete();
        await setLessonId(null);
        await setShowDeleteConfirmation(false);
        await fetchLesson();
    };
    const handleDeleteCancel = () => {
        setShowDeleteConfirmation(false);
    };

    if (isLoading) return <p>Loading courses</p>

    if (error) return <p>Something went wrong</p>

    const handleContentClick = (lessonId) => {
        setLessonId(lessonId);
        setShowAddContent(prevState => ({
            ...prevState,
            [lessonId]: !prevState[lessonId],
        }));
        console.log(showAddContent)
        console.log(lessonId)
    };

    return (
        <CourseListContainer>
            <TitleDesign>Curriculum</TitleDesign>
            <TitleDesignExtra>Start putting together your course by creating lessons</TitleDesignExtra>
            <div>
                <ul>
                    {lessons?.map((lesson) => (
                    <div key={lesson._id}>
                        <li style={{ listStyle: 'none' }}>
                            <span style={{ marginRight: '30px', fontSize:"large", color:"#0f3a6a" }}>{lesson.title.charAt(0).toUpperCase() + lesson.title.slice(1)}</span>
                            <Button onClick={() => handleContentClick(lesson._id)}>
                                {showAddContent[lesson._id] ? "Hide Content" : "+ Content"}
                            </Button>
                            {showAddContent[lesson._id] && (
                                <AddLessonContent
                                    LessonId={lesson._id}
                                />
                            )}
                            <div>
                                <ButtonStyled onClick={() => handleDeleteClick(lesson._id)}>Delete Item</ButtonStyled>
                                {showDeleteConfirmation && (
                                    <DeleteConfirmation
                                        message="Are you sure you want to delete this item?"
                                        onConfirm={handleDeleteConfirm}
                                        onCancel={handleDeleteCancel}
                                    />
                                )}
                            </div>
                        </li>
                    </div>
                    ))}
                </ul>
            </div>
            <div>
                <LessonForm onSubmit={values => postRequest(values)}/>
            </div>
        </CourseListContainer>
    );
};

export default CreateLessonContent;


const CourseListContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 25px;
  border: 2px;

  @media (min-width: 576px) {
    /* Styles for screens that are at least 576px wide */
    max-width: 540px;
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    /* Styles for screens that are at least 768px wide */
    max-width: 720px;
  }

  @media (min-width: 992px) {
    /* Styles for screens that are at least 992px wide */
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    /* Styles for screens that are at least 1200px wide */
    max-width: 1140px;
  }


`;

const TitleDesignExtra = styled.h5`
  font-style: italic;
  font-weight: normal;
  margin: 20px 0 20px 0;
`


const TitleDesign = styled.h2`
  margin: 20px 0 20px 0;
  background: #0f3a6a;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

`

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