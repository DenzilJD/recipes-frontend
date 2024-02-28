import { useState } from 'react';
import { Login } from './Components/Login';
import { SignUp } from './Components/SignUp';
import food from './assets/food.jpg';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Components/Home';

function App() {
  const [auth, setAuth] = useState('Register');

  const toggleAuth = () => {
    if (auth === 'Register')
      setAuth('Sign In');
    else
      setAuth('Register');
  }

  return (
    <Routes>
      <Route path='auth' element={
        <div className='relative text-white flex h-screen justify-end max-sm:justify-center'>

          {/* Background Image */}

          <img className="object-cover h-screen w-screen absolute -z-20" src={food} alt='food' />

          {/* Navbar */}

          <header className="w-full flex items-center justify-center absolute -z-10 mt-4">
            <h1 className='text-5xl ml-4'>Recipes</h1>
            <nav className="ml-auto w-96 max-sm:hidden">
              <ul className="flex justify-between mr-8">
                <li>Home</li>
                <li>Features</li>
                <li>Contact Us</li>
              </ul>
            </nav>
          </header>
          <div className='text-lg m-5 h-1/2 self-center max-sm:min-w-full sm:w-1/2 flex flex-col justify-between'>
            {auth === 'Register' ? <Login /> : <SignUp />}
            <p className='text-white self-center cursor-pointer' onClick={toggleAuth}>{auth}</p>
          </div>
        </div>} />
      <Route path='/' element={<Home />} />
    </Routes>
  );
}

export default App;
