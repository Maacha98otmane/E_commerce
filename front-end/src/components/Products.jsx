import React,{ useEffect, useState } from 'react'
import styled from 'styled-components'
import Product from './Product'
// import { popularProducts } from '../data'
import axios from 'axios'

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
`
const Products = ({category,sort}) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try{
        if(category){
          const res = await axios.get(`http://localhost:3030/api/product/getAll?category=${category}`)
          console.log(res.data);
          setProducts(res.data)

        }else{
          console.log(category);
          const res = await axios.get("http://localhost:3030/api/product/getAll")
          console.log(res.data);
          setProducts(res.data)
        }
        
      }catch(err){
        console.log(err)
      };
    };
    getProducts();
  }, [category])
  useEffect(() => {
    if((sort === 'newest')){
      setProducts((prev)=>
        [...prev].sort((a,b)=>a.createdAt - b.createdAt)
    )
    }else if (sort ="asc"){
      setProducts((prev)=>
        [...prev].sort((a,b)=>a.price - b.price)
    )
    }else {
      setProducts((prev)=>
        [...prev].sort((a,b)=>b.createdAt - a.createdAt)
    )
    }

  }, [sort])
      
  return (
    <Container>
        { category 
        ? products.map((item) => <Product item={item} key={item.id} />)
        : products.map((item) => <Product item={item} key={item.id} />)}
    </Container>
  )
}

export default Products