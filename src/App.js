import React, { useEffect, useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import PostPage from "./Components/Posts/PostPage";
import NewPost from "./Components/Posts/NewPost";
import Home from "./Components/Home";
import "./App.css";
import EditPost from "./Components/Posts/EditPost";

const App = () => {
	const [postList, setPostList] = useState([{}]);
	const [user, setUser] = useState("User1");

	const url = process.env.REACT_APP_API_URL;
	let navigate = useNavigate();

	useEffect(() => {
		fetch(`${url}/posts`)
			.then((res) => res.json())
			.then((data) => {
				setPostList(data);
			})
			.catch((err) => console.error(err));
	}, []);

	const submitPost = async (title, content) => {
		await fetch(`${url}/posts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ title, content, author: user })
		})
			.then((res) => {
				if (res.ok) {
					navigate("/");
					window.location.reload(false);
				}
			})
			.catch((err) => console.error(err));
	};

	const deletePost = async (postId) => {
		await fetch(`${url}/posts/${postId}`, {
			method: "DELETE"
		})
			.then((res) => {
				if (res.ok) window.location.reload(false);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const editPost = async (postId, title, content) => {
		await fetch(`${url}/posts/${postId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ title, content })
		})
			.then((res) => {
				if (res.ok) {
					navigate("/");
					window.location.reload(false);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<>
			<nav>
				<h2>Current User: {user}</h2>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/new">New Post</Link>
					</li>
				</ul>
				<button
					onClick={() => {
						if (user === "User1") setUser("User2");
						else setUser("User1");
					}}>
					Become User{user === "User1" ? "2" : "1"}
				</button>
			</nav>
			<Routes>
				<Route exact path="/" element={<Home postList={postList} deletePost={deletePost} />} />
				<Route exact path="/new" element={<NewPost onSubmit={submitPost} />} />
				<Route exact path="/edit/:postId" element={<EditPost onSubmit={editPost} url={url} />} />
				<Route exact path="/post/:postId" element={<PostPage url={url} user={user} />} />
			</Routes>
		</>
	);
};

export default App;
