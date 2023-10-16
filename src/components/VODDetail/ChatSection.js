import React, { useState } from "react";
import styled from "@emotion/styled";
import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";
import axios from "axios";

const styles = {
  ExpandCircleDownRoundedIcon: {
    color: "#5AC467",
    border: "none",
    borderRadius: "50%",
    background: "#fff",
    marginRight: "10px",
    width: "50px",
    height: "50px",
    cursor: "pointer",
  },
};

const ChatWrapper = styled.div`
  width: 80%;
  height: auto;
  margin: 10px auto 30px auto;
  position: relative;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 60px;
  background: #fff;
  border: none;
  border-radius: 40px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputField = styled.input`
  flex-grow: 1;
  margin: 0 10px 0 25px;
  font-size: 18px;
  background: none;
  border: none;
  outline: none;
`;

const CommentsWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const CommentBox = styled.div`
  height: auto;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CommentContent = styled.div`
  width: auto;
  height: 100px;
  padding: 0 200px 0 0;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 50px;
  margin: ${({ isReply }) => (isReply ? "20px 0 0 100px" : "0")};
`;

const Profile = styled.div`
  border: none;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  margin: 0 20px;
  background: ${({ isReply }) => (isReply ? "#6F6F6F" : "#5ac467")};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px auto 0 10px;
  flex-grow: 1;
`;

const ReplyButton = styled.button`
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 15px;
  background-color: transparent;
  border: none;
  color: #5ac467;
  cursor: pointer;
`;

const ReplyInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f7f7f7;
  border-radius: 50px;
  margin-top: 10px;
  padding: 15px;
`;

const ReplyInput = styled.textarea`
  width: 350px;
  height: 50px;
  border: none;
  border-radius: 50px;
  resize: none;
  font-size: 20px;
  line-height: 50px;
  padding-left: 20px;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`;

const ReplySubmitButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: #5ac467;
  border: none;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  margin-left: 10px;
  font-size: 20px;
`;

const ChatSection = ({ commentsList, setCommentsList, id }) => {
  const userName = sessionStorage.getItem("userName");
  const [inputText, setInputText] = useState(""); //댓글입력필드값 상태
  const [replyText, setReplyText] = useState(""); //대댓글 입력 상태
  const [showReplyInputFor, setShowReplyInputFor] = useState(null);

  /** 엔터 키 방지 함수 */
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  /* 댓글 입력필드 핸들러  */
  const inputChangeHandler = (e) => {
    setInputText(e.target.value);
  };

  //대댓글 입력창 토글
  const toggleReplyInputField = (commentId) => {
    setShowReplyInputFor(showReplyInputFor === commentId ? null : commentId);
  };

  const onClickAddComment = async (commentId, commentContent) => {
    try {
      const response = await axios.post(
        "https://eduventure.site:5443/vod/comment",
        {
          vodNo: id,
          vodCmtParentNo: commentId || 0,
          vodCmtContent: commentContent,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      setCommentsList(response.data.item.commentList);
      setInputText("");
      setReplyText("");
      setShowReplyInputFor(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChatWrapper>
      <InputWrapper>
        <InputField value={inputText} onChange={inputChangeHandler} />
        <ExpandCircleDownRoundedIcon
          style={styles.ExpandCircleDownRoundedIcon}
          onClick={() => onClickAddComment(0, inputText)}
        />
      </InputWrapper>
      <CommentsWrapper>
        {commentsList.map((comment) => (
          <CommentBox key={comment.id}>
            <CommentContent>
              <Profile />
              <Info>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {comment.userDTO.userName}
                </div>
                <p style={{ fontSize: "20px" }}>{comment.vodCmtContent}</p>
                <ReplyButton onClick={() => toggleReplyInputField(comment.id)}>
                  답글
                </ReplyButton>
              </Info>
            </CommentContent>

            {showReplyInputFor === comment.id && (
              <ReplyInputWrapper>
                <ReplyInput
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <ReplySubmitButton
                  onClick={() => onClickAddComment(comment.id, replyText)}
                >
                  등록
                </ReplySubmitButton>
              </ReplyInputWrapper>
            )}

            {comment.vodSonCmtList &&
              comment.vodSonCmtList.map((reply) => (
                <CommentContent key={reply.id} isReply>
                  <Profile isReply />
                  <Info>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {reply.userDTO.userName}
                    </div>
                    <p style={{ fontSize: "20px" }}>{reply.vodCmtContent}</p>
                  </Info>
                </CommentContent>
              ))}
          </CommentBox>
        ))}
      </CommentsWrapper>
    </ChatWrapper>
  );
};

export default ChatSection;
