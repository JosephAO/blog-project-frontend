import React from "react";
import Post from "./Posts/Post";

/**Display List of Posts */
const Home = ({ postList, deletePost }) => {
	return (
		<>
			<h1>HOME</h1>
			{postList.length > 0 ? (
				postList.map((post, key) => {
					let date = new Date(post.timestamp);

					return (
						<Post
							key={key}
							postId={post.id}
							title={post.title}
							author={post.author}
							timestamp={date}
							content={post.content}
							onDelete={() => {
								deletePost(post.id);
							}}
						/>
					);
				})
			) : (
				<div>No Posts</div>
			)}
		</>
	);
};

export default Home;
