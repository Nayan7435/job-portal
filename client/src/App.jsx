import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import JobsList from './pages/JobsList';
import Navbar from './components/Navbar';
import JobDetails from './pages/JobDetails';
import PostJob from './pages/PostJob';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />}></Route>
      <Route path='/jobs' element={<JobsList />}></Route>
      <Route path='/jobs/:id' element={<JobDetails />}></Route>
      <Route path='/post-job' element={<PostJob />}></Route>
    </Routes>
    </>
  );
}

export default App;