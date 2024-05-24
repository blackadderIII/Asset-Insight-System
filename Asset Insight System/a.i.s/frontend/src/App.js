import { Outlet } from 'react-router-dom';
import './App.css';
import './css/all.css'
import Navbar from './Components/Navbar';
import Toasts from './Components/Toasts';
import Titlebar from './Components/Titlebar';






function App() {
  return (
    <main>
    <Titlebar/>
      <Navbar/>
      <Toasts/>
      <section className='render-space'>
        <Outlet/>
      </section>
    </main>
  );
}

export default App;
