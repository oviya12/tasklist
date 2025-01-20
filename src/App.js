import logo from './logo.svg';
import './App.css';
import Addtask from './Components/addtask';
import { Route, Routes } from 'react-router-dom';
import Showtask from './Components/showtask';
import { BrowserRouter as Router} from 'react-router-dom';



function App() {
  return (
    <Router>
    <div className="App">

     
    <Routes>
      <Route path='/' element={<Addtask/>}></Route>
      <Route path='/showtask' element={<Showtask/>}/>
      </Routes> 

      
      
    </div>
    </Router>
  );
}

export default App;
