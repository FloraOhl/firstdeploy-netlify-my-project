import Layout from './Layout';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewBlog from './NewBlog';
import BlogPage from './BlogPage';
import EditBlog from './EditBlog';
import About from './About';
import Missing from './Missing';
import Login from './Login';
import Signup from './Signup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './api/blogs';
import useAxiosFetch from './hooks/useAxiosFetch';


function App() {


  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogBody, setBlogBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    // function for fetch blog
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blogs');
        setBlogs(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          //from axios documentation
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchBlogs();
  }, [])

  useEffect(() => {
    const filteredResults = blogs.filter((blog) =>
      ((blog.body).toLowerCase()).includes(search.toLowerCase())
      || ((blog.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [blogs, search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = blogs.length ? blogs[blogs.length - 1].id + 1 : 1;
    const newBlog = { id, title: blogTitle, body: blogBody };
    //define response
    try {
      const response = await api.blog('/blogs', newBlog);
      const allBlogs = [...blogs, response.data];
      setBlogs(allBlogs);
      // setBlogs(blogsList);
      setBlogTitle('');
      setBlogBody('');
      //history.push('/');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);

    }
  }
  const handleEdit = async (id) => {
    const updatedBlog = { id, title: editTitle, body: editBody };
    try {
      const response = await api.put(`/blogs/${id}`, updatedBlog);// replacing entire post
      setBlogs(blogs.map(blog => blog.id === id ? { ...response.data } : blog));
      setEditTitle('');
      setEditBody('');
      //history.push('/');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }
  const handleDelete = async (id) => {
    try {
      await api.delete(`/blogs/${id}`);
      const blogsList = blogs.filter(blog => blog.id !== id);
      setBlogs(blogsList);
      //history.push('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <div className="App">
      <Header title="Freedom" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Layout
          search={search}
          setSearch={setSearch}
        />}>
          <Route index element={<Home blogs={searchResults} />} />
          <Route path="blog">
            <Route index element={<NewBlog
              handleSubmit={handleSubmit}
              blogTitle={blogTitle}
              setBlogTitle={setBlogTitle}
              blogBody={blogBody}
              setBlogBody={setBlogBody}
            />} />
            <Route path=":id" element={<BlogPage
              blogs={blogs}
              handleDelete={handleDelete}
            />} />
          </Route>
          <Route path="edit/:id">

            <Route index element={<EditBlog
              blogs={blogs}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
            />} />
          </Route>
          <Route path="/blog/">
            {/* <BlogPage blogs={blogs} handleDelete={handleDelete} />  */}
          </Route>
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='editBlog' element={<EditBlog />} />
        </Route>
      </Routes>
    </div >
  );
}

export default App;