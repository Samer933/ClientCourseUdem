import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import getFilesFromS3 from "../../utils/getFilesFromS3";
import styled from "styled-components";
import axios from "axios";
import Comments from "../../features/Comments/services/Comments";
import Progress from "../../features/Progresses/services/Progress";
import placeholderImage from "../../assets/elmogShrug.gif"

const LessonPage = () => {

    const userString = localStorage.getItem("authToken2")
    const user = JSON.parse(userString);
    const userId = user.passport.user;

    const {id} = useParams()
    const {getUrlStoreInS3} = getFilesFromS3();
    const {data, error, isLoading} = useFetch(`https://mernstacktestserver.onrender.com/lessons/getAll/${id}/`);


    const [video, setVideo] = useState({});
    const [commentsOfLesson, setCommentsOfLesson] = useState(null);

    useEffect(() => {
        if (data && data.length > 0) {
            getUrl(data[0]._id);
        }
    }, [data]);

    if (isLoading) return <p>Loading lessons...</p>

    if (error) return <p>Error loading lessons or no lessons yet</p>


    const getUrl = async (lessonId) => {
        try {
            setVideo(null);
            const response = await axios.get(`https://mernstacktestserver.onrender.com/lessons/${lessonId}`);
            if (response.data.thumbnailUrl || response.data.videoUrl) {
                const videoUrl = await getUrlStoreInS3(response.data.videoUrl);
                setVideo(videoUrl);
                setCommentsOfLesson(lessonId)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Container>
            <PageTitle>Lesson page</PageTitle>
            <VideoPlayerContainer>
                {video ? (
                        <VideoPlayer controls preload="auto">
                            <source src={video} type='video/mp4'/>
                        </VideoPlayer>
                ) : (
                    <PlaceHolderImage loading="lazy" src={placeholderImage} alt="placeholder"></PlaceHolderImage>
                )}
            </VideoPlayerContainer>
            <PlaylistContainer>
                <PlaylistHeader>Lesson playlist</PlaylistHeader>
                {data && data.map((lesson) => (
                    <PlaylistItem key={lesson._id} onClick={() => getUrl(lesson._id)}>
                        <PlaylistItemTitle>{lesson.title.charAt(0).toUpperCase() + lesson.title.slice(1)}
                            <PlaylistItemDescription>
                                {lesson.description.charAt(0).toUpperCase() + lesson.description.slice(1)}
                            </PlaylistItemDescription>
                            <Progress
                                lessonId={lesson._id}
                                courseId={id}
                            />
                        </PlaylistItemTitle>
                    </PlaylistItem>
                ))}
            </PlaylistContainer>
                <Comments lessonId={commentsOfLesson}/>
        </Container>
    );
};
export default LessonPage;

// css
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 25px;
  border: 2px;
`;

const PageTitle = styled.h1`
  display: flex;
  align-self: center;
  margin: 20px 0 20px 0;
  background: #0f3a6a;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const VideoPlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PlaceHolderImage = styled.img`
  width: 100%;
  max-width: 800px;
  height: auto;
  margin-bottom: 1rem;
`;

export const VideoPlayer = styled.video`
  width: 100%;
  max-width: 800px;
  height: auto;
  margin-bottom: 1rem;
`;

const PlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  align-self: center;
  border: 4px solid #0f3a6a;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  width: 60%;
`;

const PlaylistHeader = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: #0f3a6a;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const PlaylistItem = styled.div`
  color: black;
  background: white;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  width: 25%;


  &:hover {
    background-color: #0f3a6a;
    color: white;
  }
`;

const PlaylistItemTitle = styled.h4`
  font-size: 1rem;
  font-weight: bold;
  margin: 0.25rem;

 
`;

const PlaylistItemDescription = styled.p`
  font-size: 0.8rem;
  margin: 0.25rem;

  
`;



