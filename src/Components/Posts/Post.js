import React, { useState } from "react";
import { Link } from "react-router-dom";

/**Display a single Post title and content */
const Post = ({ postId, title, content, author, timestamp, onDelete }) => {
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	return (
		<>
			{showModal && (
				<div className="modal">
					<div className="modal-content">
						<h3>Confirm Delete</h3>
						<p>Are you sure you want to delete post: {title}?</p>
						<button onClick={onDelete}>Yes</button>
						<button onClick={toggleModal}>No</button>
					</div>
				</div>
			)}
			<div className="post">
				<Link to={`/post/${postId}`}>
					<h2>{title}</h2>
				</Link>
				<p>{content}</p>
				<h5>{`${author} on ${timestamp}`}</h5>
				<button onClick={toggleModal}>Delete Post</button>
				<Link to={`/edit/${postId}`}>
					<button>Edit Post</button>
				</Link>
			</div>
		</>
	);
};

export default Post;
