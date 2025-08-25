import axios from "axios";
import "./app.css"
function App() {

  const initPay = (data) => {
    const options = {
      key: "rzp_test_R8NQEsn2VKxv3s",
      amount: 499,
      currency: "INR",
      name: "Nike",
      description: "Test",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyURL = "http://localhost:8080/verify";
          const { data } = await axios.post(verifyURL, response);
          console.log(data, "<--- virified")
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePay = async () => {
    try {
      const orderURL = "http://localhost:8080/orders";
      const { data } = await axios.post(orderURL, { amount: 499 });
      initPay(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="App">
        <div className="img">
          <img src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png" alt="" />
        </div>
        <div className="heading">
          <h1>Buy Nike shouse</h1>
          <p>Colour Shown: Multi-Colour/Multi-Colour/Multi-Colour</p>
          <button onClick={handlePay} >Pay 499 Rs.</button>
        </div>
      </div>
    </div>
  );
}

export default App;
