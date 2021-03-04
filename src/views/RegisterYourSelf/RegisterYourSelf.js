import { Link } from "react-router-dom";
import "../../assets/css/style.css";
import "../../assets/css/media.css";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer'
function RegisterYourSelf() {
  return (
    <>
 <Header cust_sign="cust_sign"/>
      <div class="content_register">
        <h1 style={{ color: "#2b345f",textDecoration:"none" }}>
          <Link to="/customer/signup">PLEASE REGISTER YOURSELF</Link>
        </h1>
      </div>
      <Footer />
    </>
  );
}

export default RegisterYourSelf;
