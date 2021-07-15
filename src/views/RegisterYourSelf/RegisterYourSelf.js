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
            <button type="button" class="btn btn-outline-primary btn-lg"
              style={{ borderRadius: "25px" }}>
              Signin
            </button>
          </Link>

          <p style={{ marginLeft: "100px", marginTop: "45px", fontSize: "20px" }}>
            Existing Customers
          </p>
        </div>


        <div style={{
          height: "200px", width: "300px", border: "2px solid blue", textAlign: "center",
          paddingTop: "80px"
        }}>
          <Link to="/customer/signup">
            <button type="button" class="btn btn-outline-primary btn-lg"
              style={{ borderRadius: "25px" }}>
              SignUp
            </button>
          </Link>
          <p style={{ marginLeft: "100px", marginTop: "45px", fontSize: "20px" }}>
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