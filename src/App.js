import Home from './routes/homepage/homepage.component'
import { Routes, Route } from 'react-router-dom'
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={ <Home /> } />
        <Route path='auth' element={ <Authentication /> } />
      </Route>  
    </Routes>     
  )  
}

export default App;
