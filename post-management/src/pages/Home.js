import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import img from "../images/Logo.jpg";
import { toast } from "react-toastify";
import Jumbotron from "../components/Jumbotron";

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [readMore, setReadMore] = useState(false);

  let id = props.match.params.id;

  // fetch all posts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.slice(0, 6));
      });
  }, []);

  // function to remove
  const handleRemove = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch("https://jsonplaceholder.typicode.com/posts/" + id, requestOptions)
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log("Data deleted", res));
    toast.success("Post deleted successfully");
  };

  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["Post Management"]} />
      </div>

      <div className="container-fluid">
        <h3 className="text-center mt-5">All Posts</h3>
        <div className="col-md-8 offset-2">
          <div className="row">
            {posts.length &&
              posts.map((post) => (
                <div key={post.id} className="col-md-4 mt-5 mb-3">
                  <Card
                    style={{ width: 300, borderColor: "grey" }}
                    actions={[
                      <Link to={`/posts/${post.id}`}>
                        <button
                          className="btn btn-outline-info"
                          style={{
                            height: "30px",

                            fontSize: "10px",
                          }}
                        >
                          Read more
                        </button>
                      </Link>,
                      <DeleteOutlined
                        className="text-danger"
                        onClick={() => handleRemove(id)}
                      />,
                    ]}
                  >
                    <img
                      src={img}
                      alt=""
                      style={{ height: "130px", objectFit: "cover" }}
                    />
                    <p className="mt-3">
                      <b>Title:</b> {post.title}
                    </p>
                    <p>
                      <b>Description:</b>
                      {readMore
                        ? post.body
                        : `${post.body.substring(0, 30)}...`}
                    </p>
                  </Card>{" "}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
