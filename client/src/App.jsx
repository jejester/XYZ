import './App.css';
import { BrowserRouter as Router, Route, Routes, Link  } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Register  from './pages/Register';
import Login  from './pages/Login';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/auth/validate', {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      },
    })
    .then((response) => {
      if(response.data.error){
        console.log(response.data.error);
        setAuthState(false);
      }
      else{
        setAuthState(true);
      }
    }).catch((err) =>{
      setAuthState(false);
      console.log(err);
    });
  }, [])

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
            <div className='flex flex-row gap-10 items-center justify-between bg-sky-500 text-white py-5 px-10'>
          <div className="flex gap-5">
              <Link className='text-center' to='/'>Home</Link>
              <Link className='text-center' to='/create'>Create post</Link>
            </div>
            {!authState && (
              <div className='flex gap-5'>
                <Link className='text-center' to='/login'>Login</Link>
                <Link className='text-center' to='/register'>Register</Link>
              </div>
            )}
          </div>
          <Routes >
            <Route path='/' element={<Home/>}/>
            <Route path='/create' element={<CreatePost/>}/>
            <Route path='/posts/:id' element={<Post/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes >
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
