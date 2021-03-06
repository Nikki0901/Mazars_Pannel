import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";

// const Schema = yup.object().shape({
//     p_assingment: yup.string().required("required assingment"),
//     p_name: yup.string().required("required name"),
//     p_document: yup.string().required("required file"),
//   });

export default function ProposalComponent() {
  const alert = useAlert();
  const { register, handleSubmit, reset } = useForm();

  const [incompleteData, setInCompleteData] = useState([]);
  const userid = window.localStorage.getItem("tlkey");

  const [id, setId] = useState(null);
  const [assingNo, setAssingNo] = useState('');
  const [custname, setCustName] = useState();

  useEffect(() => {
    const getQuery = () => {
      axios
        .get(`${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userid)}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setInCompleteData(res.data.result);
          }
        });
    };

    getQuery();
  }, []);


  useEffect(() => {
    const getUser = async () => {
      
      const res = await axios.get(`${baseUrl}/customers/allname?id=${id}`);
      console.log("res", res);
      setCustName(res.data.name);
      // {
      //   Object.entries(res.data.result).map(([key, value]) => {
      //     console.log("val", value.name);
      //     setCustName(value.name);
      //   });
      // }
    };

    getUser();
  }, [id]);


  const getID = (key) =>{
    setId(key)
  
    incompleteData.filter((data)=>{
      if(data.id == key){
        console.log('assingNo', data.assign_no);
        setAssingNo(data.assign_no)
      }
    })
  }

  
  const onSubmit = (value) => {
    console.log(value);

    var date = value.p_date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
    let formData = new FormData();

    formData.append("assign_no", assingNo);
    formData.append("name", value.p_name);
    formData.append("type", "tl");
    formData.append("id", JSON.parse(userid));
    formData.append("amount", value.p_amount);
    formData.append("payable", value.p_payable);
    formData.append("misc1", value.misc_1);
    formData.append("misc2", value.misc_2);
    formData.append("payable_date", value.p_date);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/uploadProposal`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          reset();
          alert.success("proposal successfully send !");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <>
      <div class="col-md-8">
        <div>
          <h3>Send Proposal</h3>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Query No.</label>
                  <select
                    class="form-control"
                    ref={register}
                    name="p_assingment"
                    // onChange={(e) => setAssing(e.target.value)}
                    onChange={(e) =>getID(e.target.value)} 
                  >
                    <option value="">--select--</option>
                    {incompleteData.map((p, index) => (
                      <option key={index} value={p.id}>
                        {p.assign_no}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    name="p_name"
                    class="form-control"
                    value={custname}
                    ref={register}
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Amount</label>
                  <input
                    type="text"
                    name="p_amount"
                    class="form-control"
                    ref={register}
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label>Payable by Through</label>
                  <input
                    type="text"
                    name="p_payable"
                    class="form-control"
                    ref={register}
                    defaultValue="NEFT"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Misc 1</label>
                  <input
                    type="text"
                    name="misc_1"
                    class="form-control"
                    ref={register}
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Misc 2</label>
                  <input
                    type="text"
                    name="misc_2"
                    class="form-control"
                    ref={register}
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Payable by date</label>
                  <input
                    type="date"
                    name="p_date"
                    class="form-control"
                    ref={register}
                  />
                </div>
              </div>
            </div>

            <br />
            <div class="form-group">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// const handleImage = (e) =>{
//   let files = e.target.files
//    console.log(files)

//   let reader = new FileReader();
//   reader.readAsDataURL(files[0])

//  reader.onload = (e) => {
//  console.log("img", e.target.result)
// }

{
  /* <div class="col-md-6">
              <div class="form-group">
                <label>Proposal File</label>
                <input type="file" name="p_image" ref={register} />
              </div>
            </div> */
}
