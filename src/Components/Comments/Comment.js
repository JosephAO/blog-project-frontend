import React, { useState } from "react";
import EditComment from "./EditComment";
import NewReply from "./NewReply";

/**Display comment */
function Comment({ id, text, author, timestamp, replyList, onDelete, onCommentEdit, onReply }) {
	const [showEditBox, setShowEditBox] = useState(false);
	const [showReplyBox, setShowReplyBox] = useState(false);
	const [currentText, setCurrentText] = useState(text);

	const toggleEdit = () => {
		setShowEditBox(!showEditBox);
	};

	const toggleReply = () => {
		setShowReplyBox(!showReplyBox);
	};

	const submitEdit = (text) => {
		onCommentEdit(id, text);
	};

	const submitReply = (text) => {
		onReply(text, id);
	};

	const submitDelete = (id) => {
		onDelete(id);
	};

	return (
		<div className="comment">
			{showEditBox ? (
				<EditComment text={currentText} submitEdit={submitEdit} />
			) : (
				<>
					<p>{text}</p>
					<h6>{`${author} on ${timestamp}`}</h6>
					<button onClick={() => submitDelete(id)}>X</button>
				</>
			)}
			<button onClick={toggleEdit}>{showEditBox ? "Close" : "Edit"}</button>
			<button onClick={toggleReply}>{showReplyBox ? "Close Reply" : "Reply"}</button>
			<br />
			{showReplyBox && <NewReply handleNewReply={submitReply} />}
			<div className="replies">
				{replyList &&
					replyList
						.filter((r) => r.parentId === id)
						.map((reply, key) => {
							let date = new Date(reply.timestamp);
							return (
								<Comment
									key={key}
									id={reply.id}
									text={reply.text}
									author={reply.author}
									timestamp={date}
									replyList={replyList}
									onDelete={onDelete}
									onCommentEdit={(id, text) => onCommentEdit(id, text)}
									onReply={(replyText, parentId) => onReply(replyText, parentId)}
								/>
							);
						})}
			</div>
		</div>
	);
}

export default Comment;
