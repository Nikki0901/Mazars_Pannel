import React from "react";

import Alerts from "../../../common/Alerts";
export default class YourComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            dates: [],
            error : []
        };
    }

    handleChange1(i, e) {
        if(isNaN(e.target.value)) {
          this.setState.error("Please enter only digit")
        }
        this.setState({
            values: { ...this.state.values, [i]: e.target.value }
        },
            () => {
                this.props.paymentAmount(this.state.values)
            })
    }

    
    handleChange2(i, e) {
        this.setState({
            dates: { ...this.state.dates, [i]: e.target.value }
        },
            () => {
                this.props.paymentDate(this.state.dates)
            })
    }


    render() {

        var amount = this.props.installment_amount
        var date = this.props.due_date

        const installment_amount = amount.split(',');
        const due_date = date.split(',');

        // console.log(due_date)

        var fieldsArray = [];

        for (var i = 0; i < this.props.installment; i++) {
            fieldsArray.push(
                <div className="row">
                    <div class="col-md-6">
                        <label>Amount</label>
                        <input
                            type="text"
                            className="form-control"
                            name={this.state.values[i]}
                            onChange={this.handleChange1.bind(this, i)}
                            defaultValue={installment_amount[i]}
                        />
                    </div>
                    <p style={{"color" : "red"}}>{this.state.error[0]}</p>
                    <div class="col-md-6">
                        <label>Due Dates</label>
                        <input
                            type="date"
                            className="form-control"
                            name={this.state.dates[i]}
                            onChange={this.handleChange2.bind(this, i)}
                            defaultValue={due_date[i]}
                        />
                    </div>
                </div >

            );
        }

        // console.log("installment_amount - ", this.props.installment_amount);
        // console.log("due_date - ", this.props.due_date);

        console.log("values - ", this.state.values);

        return (
            <div className="inputs">
                {fieldsArray}
            </div>
        );
    }
}




 // var fieldsArray = [];
  // for (var i = 0; i < installment; i++) {
  //   fieldsArray.push(
  //     <div className="row">
  //       <div class="col-md-6">
  //         <label>Amount</label>
  //         <input
  //           type='text'
  //           className="form-control"
  //           name={amount[i]}
  //           onChange={(e) => handleChange1(e, i)}
  //         />
  //       </div>
  //     </div>
  //   );
  // }


//   const handleChange1 = (e, i) => {
//     console.log("val-", e.target.value);
//     console.log("i-", i);

//     const { name, value } = e.target

//     let values = [...amount];
//     values[i] = value
//     setAmount({ values });
//   };



{/* <div>
{
  row.status == "Pending for Preparation" &&
  <Link to={`/teamleader/sendproposal/${row.id}`}>
    <i
      class="fa fa-mail-forward"
      style={{
        fontSize: "14px",
        cursor: "pointer",
      }}
    ></i>
  </Link>
}
</div>

<div>
{
  row.status_code < 9 ?
    <Link to={`/teamleader/edit-proposal/${row.id}`}>
      <i
        className="fa fa-edit"
        style={{
          fontSize: "16px",
          cursor: "pointer",
          color: "green",
        }}
      ></i>
    </Link>
    :
    null
}
</div> */}