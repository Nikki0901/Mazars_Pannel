import React from "react";
import Alerts from "../../../common/Alerts";



export default class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            dates: [],
        };
    }

    handleChange1(i, e) {
        if (isNaN(e.target.value)) {
            this.setState({ error: "Please insert only digit" })
        }
        else {
            this.setState({ error: "" })
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
        var fieldsArray = [];

        for (var i = 1; i <= this.props.installment; i++) {
            fieldsArray.push(
                <div className="row">
                    <div class="col-md-6">
                        <label>Amount</label>
                        <input
                            type="text"
                            className={classNames("form-control", {
                                "is-invalid": this.props.blankFeild,
                              })}
                            name={this.state.values[i]}
                            onChange={this.handleChange1.bind(this, i)}
                        />
                        <p style={{ "display": "block", "color": "red" }}>{this.state.error}</p>
                    </div>

                    <div class="col-md-6">
                        <label>Due Dates</label>
                        <input
                            type="date"
                            className={classNames("form-control", {
                                "is-invalid": this.props.dateError,
                              })}
                            name={this.state.dates[i]}
                            onChange={this.handleChange2.bind(this, i)}
                            min={this.props.item}
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
}



// import React from "react";

// export default class YourComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             values: [],
//             dates: [],
//             isLoading: true
//         };
//     }


//     amount = this.props.installment_amount
//     installment_amount = this.amount.split(',');
//     temp = this.installment_amount
//     handleChange1(i, e) {
//         const { value } = e.target
//         this.temp[i] = value
//         console.log(this.temp)

//         this.setState({
//             values: {
//               ...this.temp
//             }
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

//     componentDidMount() {
//         this.setState({ isLoading: false });

//         var amount = this.props.installment_amount
//         var date = this.props.due_date

//         const installment_amount = amount.split(',');
//         const due_date = date.split(',');


//         this.props.paymentAmount(installment_amount);
//         this.props.paymentDate(due_date)
//     }



//     render() {

//         var amount = this.props.installment_amount
//         var date = this.props.due_date

//         const installment_amount = amount.split(',');
//         const due_date = date.split(',');

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
//                 </div>
//             );
//         }

//         if (this.state.isLoading) {
//             return <div>Loading...</div>
//         }
//         return (
//             <div className="inputs">
//                 {fieldsArray}
//             </div>
//         );
//     }
// }

