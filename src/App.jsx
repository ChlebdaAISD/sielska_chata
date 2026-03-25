import { Router, Route, Switch } from 'wouter'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Events from './pages/Events'
import About from './pages/About'
import Contact from './pages/Contact'
import './index.css'

function App({ ssrPath }) {
  return (
    <Router ssrPath={ssrPath}>
      <div className="noise-overlay">
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
          {/* 404 fallback — render Home */}
          <Route component={Home} />
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
