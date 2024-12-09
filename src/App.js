

import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="">

     <BrowserRouter>
     <Routes>
      <Route exactn path='/login' element={<Login/>}/>
      <Route exact path='/' element={<Home/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
