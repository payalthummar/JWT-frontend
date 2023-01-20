import { useEffect, useState } from "react";

export default function Home({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch("http://localhost:8080/posts", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      fetchdata();
    }
  }, [user]);
  return (
    <div className="posts">
      {posts.length ? (
        posts.map((post) => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>
              <strong>title:</strong>
              {post.title}
            </p>
            <p>
              <strong>text:</strong>
              {post.body}
            </p>
          </div>
        ))
      ) : (
        <h2 style={{ color: "red" }}>No Posts found</h2>
      )}
    </div>
  );
}
