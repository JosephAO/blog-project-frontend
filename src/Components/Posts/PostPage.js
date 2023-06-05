import React, { useState, useEffect } from "react";
import Comment from "../Comments/Comment";
import { useParams } from "react-router-dom";
import NewComment from "../Comments/NewComment";

/** Display the parent post with comments */
const PostPage = ({ url, user }) => {
	let { postId } = useParams();
	const postUrl = `${url}/posts/${postId}`;
	const commentUrl = `${url}/posts/${postId}/comments`;

	const [commentList, setCommentList] = useState([]);
	const [currentPost, setCurrentPost] = useState([]);
	const [showStub, setShowStub] = useState(false);

	useEffect(() => {
		fetch(postUrl)
			.then((res) => res.json())
			.then((data) => {
				let post = data[0];
				setCurrentPost({ title: post.title, content: post.content });
				setCommentList(post.comments);
			})
			.catch((err) => console.error(err));
	}, [postUrl]);

	const handleNewComment = async (text, type, parentId) => {
		let data = { text, author: user, type: type || "comment", parentId: parentId || postId };
		await fetch(commentUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				window.location.reload(false);
			})
			.catch((err) => console.error(err));
	};

	const handleNewReply = (text, parentId) => {
		// console.log("reply", text, parentId);
		handleNewComment(text, "reply", parentId);
	};

	const handleCommentDelete = (commentId) => {
		fetch(`${commentUrl}/${commentId}`, {
			method: "DELETE"
		})
			.then(() => {
				window.location.reload(false);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleCommentEdit = (commentId, newText) => {
		fetch(`${commentUrl}/${commentId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ text: newText })
		})
			.then((res) => {
				if (res.ok) window.location.reload(false);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<>
			<h2>{currentPost.title}</h2>
			<p>{currentPost.content}</p>
			<hr />
			<div>
				<button
					onClick={() => {
						setShowStub(!showStub);
					}}>
					{showStub ? "Close" : "New Comment"}
				</button>
				{showStub && <NewComment handleNewComment={handleNewComment} />}
			</div>
			<br />
			{commentList.length > 0 ? (
				commentList
					.filter((item) => item.type === "comment")
					.map((comment, key) => {
						let date = new Date(comment.timestamp);
						let replyList = commentList.filter((c) => c.type === "reply");
						return (
							<Comment
								key={key}
								id={comment.id}
								text={comment.text}
								replyList={replyList}
								author={comment.author}
								timestamp={date}
								onDelete={(id) => handleCommentDelete(id)}
								onCommentEdit={(id, newText) => handleCommentEdit(id, newText)}
								onReply={(replyText, parentId) => handleNewReply(replyText, parentId)}
							/>
						);
					})
			) : (
				<div>No comments</div>
			)}
		</>
	);
};

export default PostPage;
