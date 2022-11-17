import Feed from './Feed';


const Home = ({ blogs }) => {

    return (
        <main className="Home">
            <img src="images/Freedom.jpg" className="freedom" alt="" />



            {blogs.length ? (
                <Feed blogs={blogs} />
            ) : (
                <p style={{ marginTop: "2rem" }}>

                </p>
            )}
        </main>
    )
}

export default Home