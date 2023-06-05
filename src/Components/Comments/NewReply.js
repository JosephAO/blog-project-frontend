import React, { useState } from "react";

const NewReply = ({ handleNewReply }) => {
	const [text, setText] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleNewReply(text);
		setText("");
	};

	return (
		<form onSubmit={handleSubmit}>
			New Reply
			<input type="text" value={text} onChange={(e) => setText(e.target.value)} />
			<button type="submit">Submit</button>
		</form>
	);
};

export default NewReply;
