import Calculator from './components/Calculator.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="calculator-section">
        <Calculator />
      </div>
      <Footer />
      
    </div>
  )
}

export default App