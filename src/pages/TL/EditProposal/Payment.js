import React from "react";
<<<<<<< HEAD
import classNames from "classnames";
=======
import Alerts from "../../../common/Alerts";
>>>>>>> 95548708321125ef3638685eec24d125059fe546



export default class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            dates: [],
        };
    }

<<<<<<< HEAD

 custError = this.props.blankFeild;
    amount = this.props.installment_amount
    installment_amount = this.amount.split(',');
    temp = this.installment_amount


     due_date = this.props.due_date;
     installment_due_dates = this.due_date.split(',')
    installmentDueDate = this.installment_due_dates;


    handleChange1(i, e) {
        this.props.setBlankFeild("")
        const { value } = e.target
        this.temp[i] = value
        var val2 =[]
     val2.push(...this.temp)
     var a = val2.slice(0, i+1)
=======
    handleChange1(i, e) {
        if (isNaN(e.target.value)) {
            this.setState({ error: "Please insert only digit" })
        }
        else {
            this.setState({ error: "" })
        }
>>>>>>> 95548708321125ef3638685eec24d125059fe546
        this.setState({
            values: { ...this.state.values, [i]: e.target.value }
        },
            () => {
                this.props.paymentAmount(this.state.values)
            })

    }

    handleChange2(i, e) {
<<<<<<< HEAD
        this.props.setDateError("")
        const { value } = e.target
        this.installmentDueDate[i] = value
        var val3 = []
        val3.push(this.installmentDueDate);
         var d = val3.slice(0, i+1)
=======
>>>>>>> 95548708321125ef3638685eec24d125059fe546
        this.setState({
            dates: { ...this.state.dates, [i]: e.target.value }
        },
            () => {
                this.props.paymentDate(this.state.dates)
            })

    }

    render() {
<<<<<<< HEAD
console.log("installmentValue", this.props.installmentValue)
        var amount = this.props.installment_amount
        var date = this.props.due_date

        const installment_amount = amount.split(',');
        const due_date = date.split(',');

=======
>>>>>>> 95548708321125ef3638685eec24d125059fe546
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
<<<<<<< HEAD
                       
=======
                        <p style={{ "display": "block", "color": "red" }}>{this.state.error}</p>
>>>>>>> 95548708321125ef3638685eec24d125059fe546
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

