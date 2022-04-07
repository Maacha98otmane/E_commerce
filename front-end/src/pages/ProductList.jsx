import { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announce from "../components/Announce";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from 'react-router-dom';




const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}

`

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}

`

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}

`
const Option = styled.option``

const ProductList = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [sort, setSort] = useState("newest");
 

  return (
    <Container>
      <Navbar />
      <Announce />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={e=>setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} sort={sort}/>
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default ProductList