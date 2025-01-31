import { BrowserRouter } from "react-router-dom";
import { About, Hero, Navbar } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <div >
          <Navbar />
          <Hero />
        </div>
        <About />
        {/* <Experience />
        <Tech />
        <Works />
        <Feedbacks /> */}
        <div className='relative z-0'>
          {/* <Contact />
          <StarsCanvas /> */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
