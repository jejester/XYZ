import './App.css';
import { BrowserRouter as Router, Route, Routes, Link  } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="flex flex-row gap-10 items-center justify-between bg-sky-500 text-white py-5 px-10">
          <Link className='text-center' to='/'>Home</Link>
          <Link className='text-center' to='/create'>Create post</Link>
        </div>
        <Routes >
          <Route path='/' element={<Home/>}/>
          <Route path='/create' element={<CreatePost/>}/>
          <Route path='/posts/:id' element={<Post/>}/>
        </Routes >
      </Router>
    </div>
  );
}

export default App;
