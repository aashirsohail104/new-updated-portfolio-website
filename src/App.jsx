import Navbar from './components/ui/Navbar'
import Footer from './components/ui/Footer'
import Loader from './components/ui/Loader'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import ChatAssistant from './components/ui/ChatAssistant'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-slate-200">
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  )
}
