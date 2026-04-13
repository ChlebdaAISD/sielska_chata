import { useEffect } from 'react'
import { Router, Route, Switch, useLocation } from 'wouter'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Events from './pages/Events'
import About from './pages/About'
import Contact from './pages/Contact'
import Reviews from './pages/Reviews'
import './index.css'

function ScrollToTop() {
  const [location] = useLocation()
  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }, [location])
  return null
}

function App({ ssrPath }) {
  return (
    <Router ssrPath={ssrPath}>
      <div className="noise-overlay">
        <ScrollToTop />
        <Navbar />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/menu" component={Menu} />
          <Route path="/menu/" component={Menu} />
          <Route path="/imprezy" component={Events} />
          <Route path="/imprezy/" component={Events} />
          <Route path="/o-nas" component={About} />
          <Route path="/o-nas/" component={About} />
          <Route path="/kontakt" component={Contact} />
          <Route path="/kontakt/" component={Contact} />
          <Route path="/opinie" component={Reviews} />
          <Route path="/opinie/" component={Reviews} />
          {/* 404 fallback — render Home */}
          <Route component={Home} />
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
