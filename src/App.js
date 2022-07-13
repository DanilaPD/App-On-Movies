import React, { useEffect, useState } from 'react';
import './App.css';
import MovieBox from './MovieBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, FormControl, Button} from 'react-bootstrap';

const API_URL="https://api.themoviedb.org/3/movie/popular?api_key=37d48d871a180e5a5a3b243ccb4e94ef"

const API_SEARCH="https://api.themoviedb.org/3/search/movie?api_key=37d48d871a180e5a5a3b243ccb4e94ef&query"

function App() {
  const [movies, setMovies]= useState([]);

  const [query, setQuery]= useState("");

  useEffect(() => {
    fetch(API_URL)
    .then((res)=>res.json())
    .then(data=>{
      console.log(data);
      setMovies(data.results);
    })
  }, [])
  
  const searchMovie = async(e) => {
    e.preventDefault();
    try {
      const url=`https://api.themoviedb.org/3/search/movie?api_key=37d48d871a180e5a5a3b243ccb4e94ef&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    }
    catch(e) {
      console.log(e);
    }
  }

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <>
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">Movie Geek</Navbar.Brand>

        <Navbar.Brand href="/">What's new?</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll">   </Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-3" style={{maxHeight: "100px"}} navbarScroll></Nav>

            <Form className='d-flex' onSubmit={searchMovie}>
              <FormControl type="search" placeholder="Search" className="me-2" aria-label="search" name="query" value={query} onChange={handleChange}></FormControl>
              <Button variant="secondary" type="submit">Submit</Button>
            </Form>
          </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>
      {movies.length > 0 ? (  <div className='container'>
      <div className='grid'>
     {movies.map((movieReq)=><MovieBox key={movieReq.id} {...movieReq}/>)}
      </div>
    </div> ) : ( <h2>Sorry, there were no movies found under that name!</h2>)}
    </div>
    </>
  );
}

export default App;
