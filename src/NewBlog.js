const NewBlog = ({
    handleSubmit, blogTitle, setBlogTitle, blogBody, setBlogBody
}) => {
    return (
        <main className="NewBlog">
            <h2>New Blog</h2>
            <form className="newBlogForm" onSubmit={handleSubmit}>
                <label htmlFor="blogTitle">Title:</label>
                <input
                    id="blogTitle"
                    type="text"
                    required
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                />
                <label htmlFor="blogBody">Blog:</label>
                <textarea
                    id="blogBody"
                    required
                    value={blogBody}
                    onChange={(e) => setBlogBody(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default NewBlog