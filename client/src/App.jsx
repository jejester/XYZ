import './App.css';
import { BrowserRouter as Router, Route, Routes, Link  } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="flex flex-col">
          <Link className='text-center' to='/create'>Create post</Link>
          <Link className='text-center' to='/'>Home</Link>
        </div>
        <Routes >
          <Route path='/' element={<Home/>}/>
        </Routes >
      </Router>
    </div>
  );
}

export default App;
