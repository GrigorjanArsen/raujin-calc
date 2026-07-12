import Calculator from './components/Calculator.jsx'
import Footer from './components/Footer.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <CustomCursor />
      <div className="calculator-section">
        <Calculator />
      </div>
      <Footer />
      
    </div>
  )
}

export default App