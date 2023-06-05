import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditPost = ({ onSubmit, url }) => {
	let { postId } = useParams();
	const [newTitle, setNewTitle] = useState("");
	const [newContent, setNewContent] = useState("");

	useEffect(() => {
		fetch(`${url}/posts/${postId}`)
			.then((res) => res.json())
			.then((data) => {
				let { title, content } = data[0];
				setNewTitle(title);
				setNewContent(content);
			})
			.catch((err) => console.error(err));
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(postId, newTitle, newContent);
	};

	const invalidEntry =
		newTitle.trim() === null ||
		newContent.trim() == null ||
		newTitle.trim() === "" ||
		newContent.trim() === "";

	return (
		<>
			<h2>EDIT POST</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Title:</label>
					<input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
				</div>
				<div>
					<label>Content:</label>
					<textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} />
				</div>
				<button type="submit" disabled={invalidEntry}>
					Submit
				</button>
			</form>
		</>
	);
};

export default EditPost;
