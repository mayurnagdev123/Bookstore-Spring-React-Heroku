import './App.css';
import React, { useRef } from 'react';
import Layout from './components/hoc/Layout';
import Toolbar from './components/UI/Toolbar/Toolbar';
import Home from './components/UI/Home/Home';


function App() {
  const homeDivRef = useRef();
  const scrollTopHandler = () => {
    homeDivRef.current.scrollIntoView(true, { behavior: 'smooth', block: 'center' });
  }
  return (
    <div ref={homeDivRef} style={{ overflowY: 'auto', overflowX: 'hidden' }} id="appDiv">
      <header>
        <Layout>
          <Toolbar />
          <Home scrollTopHandler={scrollTopHandler} />
        </Layout>
      </header>
    </div>
  );
}

export default App;
