
import './App.css'
import './animate.css'
import './font-awesome.min.css'
import './namari-color.css'
import Home from './components/Home'
import Heatmap from './components/Heatmap';
import Graphs from './components/Graphs'
import Herbarium from './components/Herbarium'
import Dataset from './components/Dataset'
import Api from './components/Api'
import Model from './components/Model'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import { StickyContainer } from 'react-sticky';
function App() {

  return (
    <Router>
     <StickyContainer>
      <Navbar />
    </StickyContainer>
     <main className="main-content">
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/heatmap" element={<Heatmap />} />
         <Route path="/graphs" element={<Graphs />} />
         <Route path="/herbarium" element={<Herbarium />} />
         <Route path="/model" element={<Model />} />
         <Route path="/api" element={<Api />} />
         <Route path="/dataset" element={<Dataset />} />
         {/* Define other routes that you need*/}
       </Routes>
     </main>
   </Router>
  )
}

export default App
