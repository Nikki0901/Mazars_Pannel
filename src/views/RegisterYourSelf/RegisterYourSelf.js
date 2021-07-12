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
          height: "200px", width: "300px", border: "2px solid blue", textAlign: "center",
          paddingTop: "80px"
        }}>
          <Link to="/customer/signin">
            <button type="button" class="btn btn-outline-primary btn-lg">
              Signin
            </button>
          </Link>

          <p style={{ marginLeft: "140px", marginTop: "50px" }}>
            Existing Customers
          </p>
        </div>


        <div style={{
          height: "200px", width: "300px", border: "2px solid blue", textAlign: "center",
          paddingTop: "80px"
        }}>
          <Link to="/customer/signup">
            <button type="button" class="btn btn-outline-primary btn-lg">
              SignUp
            </button>
          </Link>
          <p style={{ marginLeft: "140px", marginTop: "50px" }}>
            For New Customers
          </p>
        </div>
      </div>


      <Footer />
    </>
  );
}

export default RegisterYourSelf;


        // <p style={{ marginLeft: "15px", marginTop: "12px", }}>
        // For New Customers</p>