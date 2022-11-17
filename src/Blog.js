import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
    return (
        <article className="blog">
            <Link to={`blog/${blog.id}`}>
                <h2>{blog.title}</h2>
            </Link>
            <p className="blogBody">{
                (blog.body).length <= 25
                    ? blog.body
                    : `${(blog.body).slice(0, 25)}...`
            }</p>
        </article>
    )
}

export default Blog