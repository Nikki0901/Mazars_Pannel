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
