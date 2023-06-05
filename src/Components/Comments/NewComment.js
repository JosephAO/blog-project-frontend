import React, { useState } from "react";

/**ENter and Submit a new comment. */
const NewComment = ({ handleNewComment }) => {
	const [text, setText] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleNewComment(text);
		setText("");
	};

	return (
		<form onSubmit={handleSubmit}>
			New Comment
			<input type="text" value={text} onChange={(e) => setText(e.target.value)} />
			<button type="submit">Submit</button>
		</form>
	);
};

export default NewComment;
