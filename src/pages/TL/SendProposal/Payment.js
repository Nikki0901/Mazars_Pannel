import React, { useState , useEffect} from "react";
import { useAlert } from "react-alert";
import Alerts from "../../../common/Alerts";

const Payment = (props) => {
    const[value2, setValue] = useState({
        amount0 : '', 
        amount1 : '', 
        amount2 : '', 
        amount3 : ''
    });
    const[dates, setDates] = useState({
        dates0 : '', 
        dates1 : '', 
        dates2 : '', 
        dates3 : ''
    });
    const[error, setError]  = useState();
   
   var a = null;
  var arrayInstallemtn = [];
  const getPayment = () => {
  if(props.installment) {
  a = props.installment; 
  }
  }
  getPayment();
  if(a){
    for(var i = 0; i < a; i++) {
        arrayInstallemtn.push(i)
    }
 }
 const handler1 = (e) => {
     const name= e.target.name;
     const val = e.target.value;
     setValue((preValue) => {
      return{
          ...preValue,
          [name] : val
      }
     })
     props.paymentAmount(value2)
 }
 const handler2 = (e) => {
     console.log("heool")
    const name = e.target.name;
    const val = e.target.value;
    console.log(e.target.value)
    console.log(e.target.name)
    setDates((preValue) => {
     return{
         ...preValue,
         [name] : val
     }
    })
    props.paymentAmount(dates)
}
 console.log(value2)
 console.log(dates)
    return(
    
        <>
         {arrayInstallemtn?.map((elementInArray, index) => ( 
    <div className="installmentBox" key={index}>
                
    <div className="row">
         <div class="col-md-6">
             <label>Amount</label>
             <input
                 type="text"
                 className="form-control"
                 onChange={(e) => handler1(e)}
                 name = {`amount${index}`}
                 
             />
             
         </div>
         <div class="col-md-6">
             <label>Due Dates</label>
             <input
                 type="date"
                 className="form-control"
                 name = {`date${index}`}
                 onChange = {(e) => handler2(e)}
                 
             />
         </div>
     </div > 
 </div>
    ) 
)}
        </>
    )

}
export default Payment;

// export default class Payment extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             values: [],
//             dates: [],
//             error : ""
//             // items: []
//         };
//     }

//     handleChange1(i, e) {
//         console.log("props", this.props.totalAmount)
        
//         if(isNaN(e.target.value)) {
//             this.setState({error : "Pleae enter number only"})
//         }
//         else{
//             this.setState({error : ""})
//         }
//         var totalAmount = this.props.totalAmount

//         this.setState({
//             values: { ...this.state.values, [i]: e.target.value }
//         },
//             () => {
//                 this.props.paymentAmount(this.state.values)
//             })


//         // this.props.paymentAmount(this.state.values)
        
//     }

//     handleChange2(i, e) {
//         this.setState({
//             dates: { ...this.state.dates, [i]: e.target.value }
//         },
//             () => {
//                 this.props.paymentDate(this.state.dates)
//             })

//     }


//     render() {
//         var fieldsArray = [];

//         for (var i = 1; i <= this.props.installment; i++) {
//             fieldsArray.push(
//                 <div className="row">
//                     <div class="col-md-6">
//                         <label>Amount</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             name={this.state.values[i]}
//                             onChange={this.handleChange1.bind(this, i)}
//                         />
//                         <p style={{"color" : "red"}}>{this.state.error}</p>
//                     </div>
//                     <div class="col-md-6">
//                         <label>Due Dates</label>
//                         <input
//                             type="date"
//                             className="form-control"
//                             name={this.state.dates[i]}
//                             onChange={this.handleChange2.bind(this, i)}
//                             min={this.props.item}
//                         />
//                     </div>
//                 </div >
//             );
//         }

//         console.log("values state", this.state.values);
//         console.log("dates state", this.state.dates);

//         // console.log(" items", [...]);


//         return (
//             <div className="inputs">
//                 {fieldsArray}
//             </div>
//         );
//     }
// }


