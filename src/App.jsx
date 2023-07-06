import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import MangaCrud from './pages/MangaCrud'
import CapituloCrud from './pages/CapituloCrud'
import PaginaCrud from './pages/PaginaCrud'
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Home />} />
        <Route path="/mangas" element={<MangaCrud />} />
        <Route path='/capitulos' element={<CapituloCrud />} />
        <Route path='/paginas' element={<PaginaCrud />} />
      </Routes>

    </>
  )
}

export default App