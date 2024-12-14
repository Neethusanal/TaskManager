

import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout/Layout';


function App() {
  return (
    <div className="">

     <BrowserRouter>
     <Routes>
      <Route element={<Layout/>}>
      <Route exact path='/' element={<Home/>}/>
      </Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
