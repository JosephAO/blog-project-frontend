import React, { useState } from "react";

const NewPost = ({ onSubmit }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(title, content);
	};

	const invalidEntry =
		title.trim() === null || content.trim() == null || title.trim() === "" || content.trim() === "";

	return (
		<>
			<h2>NEW POST</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Title:</label>
					<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
				</div>
				<div>
					<label>Content:</label>
					<textarea value={content} onChange={(e) => setContent(e.target.value)} />
				</div>
				<button type="submit" disabled={invalidEntry}>
					Submit
				</button>
			</form>
		</>
	);
};

export default NewPost;
