import { Link } from 'react-router-dom';
import { useEffect } from 'react';


const Nav = ({ search, setSearch }) => {


    return (
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Blogs</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Blogs"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="blog">Blog</Link></li>
                <li><Link to="about">About</Link></li>
                <li><Link to="signup">Signup</Link></li>
                <li><Link to="login">Login</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;

