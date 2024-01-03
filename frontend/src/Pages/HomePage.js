import "./HomePage.css"
import React, { useState ,useEffect} from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const HomePage = ({userName}) => {
  // API
  const [APImessage, setMessage] = useState('');
  // 假設的商品數據
  const products = [
    { id: 1, name: "那提", price: 160 },
    { id: 2, name: "維也納奶那提", price: 175 },
    { id: 3, name: "卡布奇諾", price: 155 },
    { id: 4, name: "摩卡", price: 185 },
    { id: 5, name: "美式咖啡", price: 145 },
    // ... 其他產品
  ];

  // 購物車狀態
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  // 添加商品到購物車的函數
  const addToCart = (product) => {
    setCart(currentCart => {
      // 檢查商品是否已經在購物車中
      const isProductInCart = currentCart.find(item => item.id === product.id);
      if (isProductInCart) {
        // 如果已經在購物車中，增加數量
        return currentCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // 如果不在購物車中，添加商品
        return [...currentCart, { ...product, quantity: 1 }];
      }
    });
    console.log(cart)
  };


  const SendOrder = (cart) => {

    // 將購物車內的商品轉換為購買信息
    let purchaseInfo = {
      purchaseList: cart.map(item => ({
        productId: item.id,
        productName: item.name,
        price: item.price,
        itemCount: item.quantity
      })),
      totalAmount: total,
      buyer: {
        name: userName
      }
    }

    // 發送購買信息
    fetch('http://127.0.0.1/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(purchaseInfo)
    })
    .then(response => response.json())
    .then(data => {
      alert(`Get message from Server : ${data.time}`)
      console.log(data)
    })
    .catch(error => console.error('Error:', error));

    // setCart([]);
    // setTotal(0);
  };

  

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]); // 依賴於 cart 的變化

  return (
    <Container className='HomePage'>
      <Row>
        <Col md={8}>
          <h2>商品清單</h2>
          {products.map(product => (
            <Card key={product.id} style={{ marginBottom: '1rem' } } className="p-2">
              <Row>
                  <Col md={8}>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>價格: {product.price}</Card.Text>
                  </Col>
                  <Col md={4} className="d-flex align-items-center justify-content-center">
                    <Button variant="primary" onClick={() => addToCart(product)}>加入購物車</Button>
                  </Col>
                </Row>
            </Card>
          ))}
        </Col>
        <Col md={4}>
          <h2>購物車</h2>
          <Card  style={{ marginBottom: '1rem' }}>
                <Row>
                    <Col md={6}>商品名稱</Col>
                    <Col md={3}>數量</Col>
                    <Col md={3}>金額</Col>
                </Row>
            </Card>
          {cart.length === 0 && <p>購物車是空的</p>}
          {cart.map(item => (
            <Card key={item.id + item.name} style={{ marginBottom: '1rem' }}>
                <Row>
                    <Col md={6}>{item.name}</Col>
                    <Col md={3}>{item.quantity}</Col>
                    <Col md={3}>{item.price * item.quantity}</Col>
                </Row>
            </Card>
          ))}

          {/* <div>總金額: {calculateTotal()}</div> */}
          <div>總金額: {total}</div>
          {cart.length != 0 && <Button variant="primary" onClick={() => SendOrder(cart)}>送出訂單</Button>}
          
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
