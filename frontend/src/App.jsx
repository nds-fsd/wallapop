import React, { useState } from 'react';
import ProductPage from './components/product/ProductPage';

function App() {
  const [refresh, setRefresh] = useState(false)

    return (
    <div>
        Your App here
        <ProductPage refresh={refresh} setRefresh={setRefresh}/>
    </div>


  )
}

export default App
