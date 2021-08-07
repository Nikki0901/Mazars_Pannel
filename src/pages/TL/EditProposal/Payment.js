import React from 'react';
const YourComponent = (props) => {
    var fieldsArray = [];

           for (var i = 0; i < props.installment; i++) {
               fieldsArray.push(
                   <div className="row">
                       <div class="col-md-6">
                           <label>Amount</label>
                           <input
                               type="text"
                               className="form-control"
                             
                              
                           />
                           <p style={{ "display": "block", "color": "red" }}>{this.state.error}</p>
                       </div>
    
    
                       <div class="col-md-6">
                           <label>Due Dates</label>
                           <input
                               type="date"
                               className="form-control"
                               
                           />
                       </div>
                   </div >
    
               );
             }
    
    
       
    
             return (
                 <div className="inputs">
                     {fieldsArray}
                 </div>
             );
         }
export default YourComponent;
// import React from "react";
// import Alerts from "../../../common/Alerts";



// export default class YourComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             values: [],
//             dates: [],
//             error: ""
//         };
//     }

//     handleChange1(i, e) {
//         if (isNaN(e.target.value)) {
//             this.setState({ error: "Please insert only digit" })
//         }
//         else {
//             this.setState({ error: "" })
//         }
//         this.setState({
//             values: { ...this.state.values, [i]: e.target.value }
//         },
//             () => {
//                 this.props.paymentAmount(this.state.values)
//             })
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

//         var amount = this.props.installment_amount
//         var date = this.props.due_date

//         const installment_amount = amount.split(',');
//         const due_date = date.split(',');

//         // console.log(due_date)

//         var fieldsArray = [];

//         for (var i = 0; i < this.props.installment; i++) {
//             fieldsArray.push(
//                 <div className="row">
//                     <div class="col-md-6">
//                         <label>Amount</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             name={this.state.values[i]}
//                             onChange={this.handleChange1.bind(this, i)}
//                             defaultValue={installment_amount[i]}
//                         />
//                         <p style={{ "display": "block", "color": "red" }}>{this.state.error}</p>
//                     </div>


//                     <div class="col-md-6">
//                         <label>Due Dates</label>
//                         <input
//                             type="date"
//                             className="form-control"
//                             name={this.state.dates[i]}
//                             onChange={this.handleChange2.bind(this, i)}
//                             defaultValue={due_date[i]}
//                         />
//                     </div>
//                 </div >

//             );
//         }


//         console.log("values - ", this.state.values);

//         return (
//             <div className="inputs">
//                 {fieldsArray}
//             </div>
//         );
//     }
// }



// import React, { useState, useEffect } from "react";


// function Payment({ installment }) {

//     const [values, setValues] = useState([]);

//     const handleChange1 = (e, i) => {
//         console.log("handleChange1", e.target.value)

//         // setValues(...values, [i] = e.target.value)
//         setValues({ ...values, [i]: e.target.value });
//     }
//     console.log("values", values)



//     var fieldsArray = [];

//     for (var i = 0; i < installment; i++) {
//         fieldsArray.push(
//             <div className="row">
//                 <div class="col-md-6">
//                     <label>Amount</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name={values[i]}
//                         onChange={(e) => handleChange1(e, i)}

//                     />
//                 </div>
//             </div >
//         );
//     }



//     return (
//         <div className="inputs">
//             {fieldsArray}

//         </div>
//     );
// }


// export default Payment;