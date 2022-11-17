import { useParams, Link } from "react-router-dom";

const BlogPage = ({ blogs, handleDelete }) => {
    const { id } = useParams();
    const blog = blogs.find(blog => (blog.id).toString() === id);
    return (
        <main className="BlogPage">
            <article className="blog">
                {blog &&
                    <>
                        <h2>{blog.title}</h2>
                        <p className="blogBody">{blog.body}</p>
                        <Link to={'/edit/${blog.id}'}><button className="editButton">Edit Blog</button></Link>
                        <button className="deleteButton " onClick={() => handleDelete(blog.id)}>
                            Delete Blog
                        </button>
                    </>
                }
                {!blog &&
                    <>
                        <h2>Blog Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default BlogPage