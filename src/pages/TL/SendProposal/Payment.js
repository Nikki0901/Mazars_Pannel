
import React from "react";


export default class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            dates: [],
            // items: []
        };
    }

    handleChange1(i, e) {
        console.log("props", this.props.totalAmount)

        var totalAmount = this.props.totalAmount

        this.setState({
            values: { ...this.state.values, [i]: e.target.value }
        },
            () => {
                this.props.paymentAmount(this.state.values)
            })


        // this.props.paymentAmount(this.state.values)
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
        var fieldsArray = [];

        for (var i = 1; i <= this.props.installment; i++) {
            fieldsArray.push(
                <div className="row">
                    <div class="col-md-6">
                        <label>Amount</label>
                        <input
                            type="text"
                            className="form-control"
                            name={this.state.values[i]}
                            onChange={this.handleChange1.bind(this, i)}
                        />
                    </div>
                    <div class="col-md-6">
                        <label>Due Dates</label>
                        <input
                            type="date"
                            className="form-control"
                            name={this.state.dates[i]}
                            onChange={this.handleChange2.bind(this, i)}
                        />
                    </div>
                </div >
            );
        }

        console.log("values state", this.state.values);
        console.log("dates state", this.state.dates);

        // console.log(" items", [...]);


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
