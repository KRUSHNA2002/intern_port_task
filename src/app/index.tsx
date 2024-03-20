import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// fonts
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';

// Styles
import '../assets/css/setup.css';
import '../assets/css/sm-clean.css';
import '../assets/css/common.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';


// routes
import routes from './routes';

// UI Components
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Service from '../pages/sections/Service';
import Home from '../pages/sections/Home';
import Portfolio from '../pages/sections/portfolio';
import Contact from '../pages/sections/Contact';
import Skills from '../pages/sections/Skills';
import Resume from '../pages/sections/Resume';


// -------------

/**
 * Making base name for the website (needed in deployment)
 */
const router = createBrowserRouter(routes, {
  basename: '/volos-react',
});

function App() {
  return (
    <div className="App">
      <div className="container-fluid p-0">
        <div className="row">
          <div className='col-md-3 p-0'>
              <Navbar isLanding={false}/>
          </div>
          <div className='col-md-9 p-0' >
          <Layout>
              <RouterProvider router={router} />
              <Home/>
              <Service/>
              <Portfolio/>
              <Resume/>
              <Skills/> 
              <Contact/>
          </Layout>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
