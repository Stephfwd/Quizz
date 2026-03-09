import Routing from './routes/Routing'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <Routing />
    </CartProvider>
  )
}

export default App

