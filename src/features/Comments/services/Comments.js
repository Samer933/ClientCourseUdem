import React, {useEffect, useState} from 'react';
import axios from "axios";
import styled from "styled-components";
import Comment from "./Comment"
import CommentForm from "./CommentForm";

const Comments = ({lessonId : lessonID}) => {
    const userString = localStorage.getItem("authToken2")
    const user = JSON.parse(userString);
    const userId = user.passport.user;

    const lessonId = lessonID

    const [comments, setComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null)
    const rootComments = comments.filter(comments => comments.parentComment === null)


    const getReplies = commentId => {
        return comments
            .filter(comment => comment.parentComment === commentId)
            .sort((a, b) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
    };

    const addComment = async (text, parentId) => {
        console.log("addComment, this is the id", parentId)
        try {
            const response = await axios.post(`/comments/${userId}/createComment/${lessonId}`, {
                text: text,
                parentId: parentId
            })
            const newComment = response.data.comment;
            setComments(([newComment, ...comments]))
            setActiveComment(null)

        } catch (error) {
            console.log(error)
        }
    }

    const deleteComment = async (commentId) => {
        if (window.confirm("Are you sure that you want to remove your comment")){
            console.log("delete comment", commentId)
            try {
                const response = await axios.delete(`/comments/delete/${commentId}/`)
                const newComment = response.data.comment;
                console.log(newComment)
                const updatedComment = comments.filter(comment => comment._id !== commentId)
                setComments(updatedComment)

            } catch (error) {
                console.log(error)
            }
        }
    }

    const updateComment = async (text, commentId) => {
        console.log("updateComment", text, commentId)
        try {
            const response = await axios.put(`/comments/update/${commentId}`, {
                text: text,
                commentId: commentId
            })
            const updatedComments = comments.map(comment => {
                if (comment._id === commentId) {
                    return {...comment, text: text}
                }
                return comment
            })
            setComments(updatedComments)
            setActiveComment(null)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        if (lessonId) {
            const fetchComments = async () => {
                /*setIsLoading(true);*/
                try {
                    const response = await axios.get(`/comments/getComments/${lessonId}`);
                    setComments(response.data);
                } catch (error) {
                    console.log(error)
                }
            };
            fetchComments();
        }

    }, [lessonId])

    return (
        <CommentsLayout>
            <CommentsTitle>
                Comments
            </CommentsTitle>
            <CommentFormTitle>Write comment</CommentFormTitle>
            <CommentForm submitLabel="Write" handleSubmit={addComment}/>
            <CommentContainer>
                {rootComments && rootComments.map((rootComment) => (
                    <Comment
                        key={rootComment._id}
                        comment={rootComment}
                        replies={getReplies(rootComment._id)}
                        currentUserId={userId}
                        deleteComment={deleteComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                        updateComment={updateComment}
                    />
                ))}
            </CommentContainer>
        </CommentsLayout>
    );
};

const CommentsLayout = styled.div`
  margin-top: 20px;
`

const CommentsTitle = styled.div`
  font-size: 30px;
  margin: 20px 0 20px 0;
  background: #0f3a6a;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const CommentFormTitle = styled.div`
  font-size: 22px;
  margin: 20px 0 20px 0;
  background: #0f3a6a;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const CommentContainer = styled.div`
  margin-top: 40px;
`


export default Comments;
