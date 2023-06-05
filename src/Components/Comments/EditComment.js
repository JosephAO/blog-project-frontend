import React, { useState } from "react";

const EditComment = ({ text, submitEdit }) => {
	const [newText, setNewText] = useState(text);

	const handleSubmit = (e) => {
		e.preventDefault();
		submitEdit(newText);
	};

	return (
		<form onSubmit={handleSubmit}>
			Edit Comment
			<input type="text" value={newText} onChange={(e) => setNewText(e.target.value)} />
			<button type="submit">Submit</button>
		</form>
	);
};

export default EditComment;
