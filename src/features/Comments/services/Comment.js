import React from 'react';
import styled from "styled-components";
import UserImage from "../../../assets/user-icon.png"
import CommentForm from "./CommentForm";

const Comment = ({
                     comment,
                     replies,
                     currentUserId,
                     deleteComment,
                     activeComment,
                     setActiveComment,
                     parentId = null,
                     addComment,
                     updateComment
                 }) => {

    const fiveMinutes = 300000
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
    const canReply = Boolean(currentUserId)
    const canEdit =
        currentUserId === comment.author && !timePassed
    const canDelete =
        currentUserId === comment.author && replies.length === 0 && !timePassed;
    const createdAt = new Date(comment.createdAt).toLocaleDateString()
    const isReplying =
        activeComment &&
        activeComment.type === "replying" &&
        activeComment.id === comment._id
    const isEditing =
        activeComment &&
        activeComment.type === "editing" &&
        activeComment.id === comment._id
    const replyId = parentId ? parentId : comment._id
    return (
        <CommentsLayout>
            <div style={{width: "100%"}}>
                <CommentUserImageContainer>
                    <img src={UserImage} style={{borderRadius: "50px"}} alt="User Icon"/>
                </CommentUserImageContainer>
                <div style={{width: "100%"}}>
                    <CommentContent>
                        <CommentAuthor>{comment.author.username}</CommentAuthor>
                        <div>{createdAt}</div>
                    </CommentContent>
                    {!isEditing && <CommentText>{comment.text}</CommentText>}
                    {isEditing && (
                        <CommentForm
                            submitLabel="Update"
                            hasCancelButton
                            initialText={comment.text}
                            handleSubmit={(text) => updateComment(text, comment._id)}
                            handleCancel={() => setActiveComment(null)}
                        />
                    )}
                    <CommentActions>
                        {canReply && (<CommentAction
                                onClick={() =>
                                    setActiveComment({id: comment._id, type: "replying"})
                                }
                            >Reply
                            </CommentAction>
                        )}
                        {canEdit && (<CommentAction
                                onClick={() =>
                                    setActiveComment({id: comment._id, type: "editing"})
                                }
                            >Edit
                            </CommentAction>
                        )}
                        {canDelete && (<CommentAction
                                onClick={() => deleteComment(comment._id)}
                            >Delete</CommentAction>
                        )}
                    </CommentActions>
                    {isReplying && (
                        <CommentForm
                            submitLabel="Reply"
                            handleSubmit={(text) => addComment(text, replyId)}
                        />
                    )}
                    {replies.length > 0 && (
                        <div style={{marginLeft: "20px", marginTop: "20px"}}>
                            {replies.map(reply => (
                                <Comment
                                    comment={reply}
                                    key={reply._id}
                                    replies={[]}
                                    currentUserId={currentUserId}
                                    deleteComment={deleteComment}
                                    parentId={comment._id}
                                    addComment={addComment}
                                    activeComment={activeComment}
                                    setActiveComment={setActiveComment}
                                    updateComment={updateComment}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </CommentsLayout>
    );
};

const CommentsLayout = styled.div`
  display: flex;
  margin-bottom: 28px;
`

const CommentUserImageContainer = styled.div`
  margin-right: 12px;
`

const CommentContent = styled.div`
  display: flex;
`

const CommentAuthor = styled.div`
  margin-right: 8px;
  font-size: 20px;
  color: rgb(59, 130, 246);
`

const CommentText = styled.div`
  font-size: 18px;
`

const CommentActions = styled.div`
  display: flex;
  font-size: 12px;
  color: rgb(51, 51, 51);
  cursor: pointer;
  margin-top: 8px;
`

const CommentAction = styled.div`
  margin-right: 8px;
`


export default Comment;
