import { useForm, useFieldArray } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useAlert } from "react-alert";

// const Schema = yup.object().shape({
//   p_sought: yup.string().required("required sought"),
//   p_opinion: yup.string().required("required expert"),
// });


function Questionnaire(props) {
  const alert = useAlert();
  const { handleSubmit, register, errors, reset, control } = useForm();

  // const [id, setId] = useState('');
  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);

  const { append, remove, fields } = useFieldArray({
    control,
    name: "specific",
  });

  const userId = window.localStorage.getItem("userid");
  const category = window.localStorage.getItem("category");
  const userNameId = window.localStorage.getItem("userNameId");

//alert msg
  const Msg = () =>{
    return(
      <>
      <p style={{fontSize:"12px"}}>Query successfully added!</p>
      </>
    )
  }

  const onSubmit = (value) => {
    console.log("value :", value);
    console.log("value :", Number(value.p_format_word));
    console.log("value :", Number(value.p_format_digital));
    console.log("value :", Number(value.p_format_physically));

   
      let formData = new FormData();
      formData.append("fact", value.p_fact);
      formData.append("specific", JSON.stringify(value.specific));
      formData.append("upload_1", value.p_document1[0]);
      formData.append("upload_2", value.p_document2[0]);
      formData.append("upload_3", value.p_document3[0]);
      formData.append("purpose", value.p_purpose);
      formData.append("timelines", value.p_timelines);
      formData.append("user", JSON.parse(userId));
      formData.append("cid", JSON.parse(category));
      formData.append("softcopy_word",Number(value.p_format_word) );
      formData.append("softcopy_digitally_assigned",Number(value.p_format_digital) );
      formData.append("printout_physically_assigned",Number(value.p_format_physically));

      formData.append("case_name", value.p_case_name);
      formData.append("assessment_year", value.p_assessment_year);
      
      // axios({
      //   method: "POST",
      //   url: `${baseUrl}/customers/PostQuestion`,
      //   data: formData,
      //   headers: {
      //     'content-type': 'multipart/form-data'
      //   }
      // })

      axios.post(`${baseUrl}/customers/PostQuestion`, formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then(function (response) {
          console.log("res-", response);
          if (response.data.code === 1) {
            reset();
             alert.success(<Msg />);
            props.history.push("/customer/dashboard");
          }
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    };




  const SuccessMesg = () => {
    return (
      <>
        <Modal isOpen={modal} toggle={toggle} size="sm">
          <ModalHeader toggle={toggle}></ModalHeader>

          <ModalBody>
            <div class="modal-body">
              <h1 style={{ textAlign: "center", fontSize: "1.5rem" }}>
                UserId : {JSON.parse(userNameId)}
              </h1>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  };


  return (
    <>
      <Header id={JSON.parse(userNameId)} />
      <div className="container">
        {SuccessMesg()}
        <div className="form">
          <div className="heading">
            <h2>Basic Questionnaire</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Facts of the case</label>
                  <textarea
                    className="form-control"
                    id="textarea"
                    rows="6"
                    name="p_fact"
                    ref={register}
                  ></textarea>
                </div>
              </div>

              <div className="col-md-6">
                <div className="question_query mb-2">
                  <label className="form-label">
                    Specific Query (ies) for advisory
                  </label>
                  <div
                    className="btn btn-primary"
                    onClick={() => append({ query: "" })}
                  >
                    +
                  </div>
                </div>
                

                {fields.length > 0 &&
                  fields.map((item,index) => (                 
                    <div>
                      {
                        fields.length < 5 ?
                         <div className="question_query_field mb-2" key={index}>
                        <input
                          type="text"
                          className="form-control"
                          ref={register}
                          name={`specific[${index}].query`}
                          placeholder="Specify your query"
                        />
                        <div
                          className="btn btn-primary ml-2"
                          onClick={() => remove(index)}
                        >
                          -
                        </div>
                      </div> : null
                      }                  
                    </div>    
                 ))}
                  
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Upload Your Document</label>
                  <input
                    type="file"
                    name="p_document1"
                    ref={register}
                    className="form-control-file"
                  />
                  <input
                    type="file"
                    name="p_document2"
                    ref={register}
                    className="form-control-file"
                    multiple={true}
                  />
                  <input
                    type="file"
                    name="p_document3"
                    ref={register}
                    className="form-control-file"
                    multiple={true}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Purpose for which Opinion is sought
                  </label>
                  <select
                    className="form-select form-control"
                    name="p_purpose"
                    aria-label="Default select example"
                    ref={register}
                  >
                    <option value="">--select--</option>
                    <option value="Assessment">Assessment</option>
                    <option value="Appeal">Appeal</option>
                    <option value="Internal">Internal records</option>
                    <option value="Production">
                      Production before other Authorities
                    </option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Case name</label>
                  <input
                    type="text"
                    name="p_case_name"
                    ref={register}
                    className="form-control"                
                  />             
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Assessment year</label>
                  <input
                    type="text"
                    name="p_assessment_year"
                    ref={register}
                    className="form-control"             
                  />             
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Format in which Opinion is required
                  </label>
                  <br />
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="p_format_word"
                      ref={register}    
                      // value="1"                 
                    />
                    <label className="form-check-label">
                      Softcopy - Word/ Pdf
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="p_format_digital"
                      ref={register}
                      // value="1" 
                    />
                    <label className="form-check-label">
                      SoftCopy- Digitally Signed
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="p_format_physically"
                      ref={register}
                      // value="1" 
                    />
                    <label className="form-check-label">
                      Printout- Physically Signed
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Timelines within which Opinion is Required
                  </label>
                  <br />
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="p_timelines"
                      ref={register}
                      value="Urgent, (4-5 Working Days)"
                      defaultChecked
                    />
                    <label>Urgent, (4-5 Working Days)</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="p_timelines"
                      ref={register}
                      value="Regular (10-12 Working Days)"
                    />
                    <label>Regular (10-12 Working Days)</label>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Questionnaire;



//   const onSubmit = (value) => {
//     console.log("value :", value);

//     let formData = new FormData();
//     formData.append("draft_report", value.p_draft[0]);
   
//     axios.post(`${baseUrl}/customers/PostQuestion`, formData, {
//       headers: {
//         'content-type': 'multipart/form-data'
//       }
//     }).then(response => {
//       console.log(response.data)
//       alert.success("draft Report uploaded !");
//     });
     
// };
 

 // let reader = new FileReader();
    // reader.readAsDataURL(value.p_document[0]);

    // reader.onload = (e) => {
      // console.log(e.target.result)
      // files = e.target.result
  // }

{
  /* <div className="mb-3">
            <label className="form-label"> Specific Questions</label>
            <input
              type="text"
              className="form-control"
              name="p_specific"
              ref={register}
              placeholder="Enter Purpose"
            />
            </div> */
}

// function onFileUpload(event) {
//   event.preventDefault();
//   // Get the file Id
//   let id = event.target.id;
//   // Create an instance of FileReader API
//   let file_reader = new FileReader();
//   // Get the actual file itself
//   let file = event.target.files[0];
//   file_reader.onload = () => {
//   // After uploading the file
//   // appending the file to our state array
//   // set the object keys and values accordingly
//     setFiles([...files, { file_id: id, uploaded_file: file_reader.result }]);
//   };
//  // reading the actual uploaded file
//   file_reader.readAsDataURL(file);
// }

// const file = data.image[0];
//     const storageRef = app.storage().ref();
//     const fileRef = storageRef.child(file.name);
//     fileRef.put(file).then(() => {
//       console.log("Uploaded a file");
//     });

{
  /* <div className="mb-3">
                <div className="question_query mb-2">
                  <label className="form-label">
                    Specific Query (ies) for advisory
                  </label>
                  <div
                    className="btn btn-primary"
                    onClick={() => append({ query: "" })}
                  >
                    +
                  </div>
                </div>

                {fields.map((item, index) => (
                  <div className="question_query_field mb-2" key={index}>
                    <input
                      type="text"
                      className="form-control"
                      ref={register}
                      name={`users[${index}].query`}
                      placeholder="Specify your query"
                    />
                    <div
                      className="btn btn-primary ml-2"
                      onClick={() => remove(index)}
                    >
                      -
                    </div>
                  </div>
                ))}
              </div> */
}

//   <div className="form-check">
//   <input
//     className="form-check-input"
//     type="radio"
//     name="p_format"
//     ref={register}
//     value="Softcopy - Word/ Pdf"
//     defaultChecked
//   />
//   <label>Softcopy - Word/ Pdf</label>
// </div>
// <div className="form-check">
//   <input
//     className="form-check-input"
//     type="radio"
//     name="p_format"
//     ref={register}
//     value="SoftCopy- Digitally Signed"
//   />

//   <label>SoftCopy- Digitally Signed</label>
// </div>
// <div className="form-check">
//   <input
//     className="form-check-input"
//     type="radio"
//     name="p_format"
//     ref={register}
//     value="Printout- Physically Signed"
//   />

//   <label>Printout- Physically Signed</label>
// </div>


