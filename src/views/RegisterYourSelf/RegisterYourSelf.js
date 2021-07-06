import { Link } from "react-router-dom";
import "../../assets/css/style.css";
import "../../assets/css/media.css";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer'
function RegisterYourSelf() {
  return (
    <>
      <Header cust_sign="cust_sign" />


      <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "140px", }}>

        <div style={{
          height: "200px", width: "300px", border: "2px solid blue",
          padding: "78px 101px"
        }}>

          <Link to="/customer/signin">
            <button type="button" class="btn btn-outline-primary btn-lg btn-block">
              Signin
            </button>
          </Link>
          <p style={{ marginLeft: "15px", marginTop: "12px", color: "forestgreen" }}>
            Existing Customers</p>
        </div>

        <div style={{ height: "200px", width: "300px", border: "2px solid blue", padding: "78px 101px" }}>
          <Link to="/customer/signup">
            <button type="button" class="btn btn-outline-primary btn-lg btn-block">
              SignUp
            </button>
          </Link>
          <p style={{ marginLeft: "15px", marginTop: "12px", color: "forestgreen" }}>
            For New Customers</p>
        </div>
      </div>


      <Footer />
    </>
  );
}

export default RegisterYourSelf;
{/* <h1 style={{ color: "#2b345f",textDecoration:"none" }}>
          <Link to="/customer/signup">
            PLEASE REGISTER YOURSELF
            </Link>
        </h1> */}