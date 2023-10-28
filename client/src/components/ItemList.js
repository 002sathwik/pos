import React from "react";
import { Button, Card } from "antd";
import { useDispatch } from "react-redux";




const ItemList =({ item }) =>{
  const dispatch = useDispatch()
  //update card handler    onclick function
  const handleAddToCart =()=>{
    dispatch({
      type:'ADD-TO-CART',
      payload: {...item, quantity:1}
    })
      
  }
  const { Meta } = Card;
  return (
    <div>
      {" "}
      <Card className=" card-items"
        hoverable
        style={{
          width: 160,
          height: 160,
           margin:18,
        }}
        cover={
          <img
            alt={item.name}
            src={item.image}
            style={{ width: 80, height: 80,  padding:2}}
          />
        }
   
      > 
        <Meta className="card-text" title={item.name} />
         <div className="item-button">
          <Button onClick={handleAddToCart}>ADD</Button>  
           {/* clicked items added to cart */}
         </div>
        

      </Card>
    </div>
  );
};

export default ItemList
