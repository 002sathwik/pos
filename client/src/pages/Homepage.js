import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import ItemList from "../components/ItemList";

const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [SelectedCategory, setSelectCategory] = useState("drinks");
  const categories = [
    {
      name: "drinks",
      imageUrl:
        "https://static.toiimg.com/thumb/msid-82736662,imgsize-896468,width-400,resizemode-4/82736662.jpg",
    },
    {
      name: "chinies",
      imageUrl:
        "https://www.shutterstock.com/shutterstock/photos/1454326133/display_1500/stock-photo-assorted-indo-chinese-dishes-in-group-includes-schezwan-szechuan-hakka-noodles-veg-fried-rice-veg-1454326133.jpg",
    },
    {
      name: "northsouth",
      imageUrl:
        "https://assets.vogue.com/photos/6352ccb841ea2bd565be085f/master/w_2560%2Cc_limit/GettyImages-1223580360.jpg",
    },
    {
      name: "Chats",
      imageUrl:
        "https://www.tasteofhome.com/wp-content/uploads/2019/08/group-bombay-chat-food-includes-golgappapanipuri-shutterstock_1422412163.jpg?resize=1024%2C640",
    },
    {
      name: "SnacksBevegers",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREwtbBwIW79DWltNlUvmz1o6lq7MkfgLar-Z9m_xgjA5uKC7BAI13UWvg8o3IBOrOyqB4&usqp=CAU",
    },
    {
      name: "IceCream",
      imageUrl:
        "https://c4.wallpaperflare.com/wallpaper/41/723/754/food-ice-cream-wallpaper-preview.jpg",
    },
  ];

  useEffect(() => {
    const getAllItems = async () => {
      // Add the "async" keyword here
      try {
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllItems();
  }, []);

  return (
    <DefaultLayout>
      <div className="d-flex categories">
        {categories.map(category => (
          <div
            key={category.name}
            className={`d-flex category ${
              SelectedCategory === category.name  && "category-active"
            }`}
            onClick={() =>setSelectCategory(category.name)}
          
          >
            <h4>{category.name}</h4>
            <img
              src={category.imageUrl}
              alt={category.name}
              height="60"
              width="60"
            />
          </div>
        ))}
      </div>
      <Row className="itemcat">
        {itemsData.filter(i=>i.category === SelectedCategory).map((item) => (
          <Col xs={26} lg={6} md={12} sm={25} key={item.id}>
            <ItemList  key={item.id} item={item} />
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
};
export default Homepage;
