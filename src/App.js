import './App.css';
import Header from './component/Header';
import ProductList from './component/ProductList';
import CartList from './component/CartList';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
function App() {

  const [product, setProduct] = useState([])
  // const [filteredProducts, setFilterdProducts] = useState([])
  const [pending, setPending] = useState(true)

  useEffect(() => {
    axios.get("https://dummyjson.com/products?skip=0&limit=100")
      .then(res => {
        setProduct(res.data.products)
        // setFilterdProducts(res.data.products)
        setPending(false)
      })
      .catch(err => { console.log(err) })
  }, [])

  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [fetch, setFetch] = useState()

  const { id } = useParams()

  const addToCart = (data) => {
    // setCart([...cart, { ...data, quantity: 1 }])
    // console.log(cart)
    // console.log('done')
    axios.post(`https://fetchdata-25670-default-rtdb.firebaseio.com/fetchdata.json`, data)
      .then(data =>
        setCart([...cart, { ...data, quantity:1 }]))
      .catch(err => { console.log(err) })
  }


  // useEffect(() => {
  //     axios.get(`https://fetchdata-25670-default-rtdb.firebaseio.com/fetchdata.json`)
  //     .then (res => setFetch( 
  //       Object.keys(res.data).map((key) => {
  //         return {...res.data[key], id: key}
  //       })
  //     ))
  //     .catch(err => { console.log(err) })
  // })

  const handleShow = (value) => {
    setShowCart(value)
  }

console.log(fetch)

return (
  <>
    {/* <FetchImages /> */}
    {/* <InfiniteScroll
        dataLength={product.length} //This is important field to render the next data
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={this.refresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
      > */}
    <div>
      <Header count={cart.length}
        handleShow={handleShow} ></Header>

      {
        showCart ?
          <CartList fetch={fetch} cart={cart} ></CartList> :
          <ProductList product={product} addToCart={addToCart} ></ProductList>
      }


    </div>
    {/* </InfiniteScroll> */}
  </>
);
}

export default App;