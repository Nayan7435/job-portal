import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import JobsList from './pages/JobsList';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />}></Route>
      <Route path='/jobs' element={<JobsList />}></Route>
    </Routes>
  );
}

export default App;