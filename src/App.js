import Home from './routes/homepage.component';
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={ <Home /> } />
    </Routes>     
  )  
}

export default App;
