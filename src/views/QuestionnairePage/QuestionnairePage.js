import { useForm, useFieldArray } from "react-hook-form";
import React , {useState , useEffect} from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer'
import axios from 'axios'
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


  // const { append, remove, fields } = useFieldArray({
  //   control,
  //   name: "users",
  // });

  const userId = window.localStorage.getItem("userid");
  const category = window.localStorage.getItem("category");
  const uid = window.localStorage.getItem("uid");


  const onSubmit = (value) => {
    console.log("value :", value);

    const format = [
      value.p_format_word,
      value.p_format_digital,
     value.p_format_physically
    ]


    let reader = new FileReader();
    reader.readAsDataURL(value.p_document[0]);

    reader.onload = (e) => {

      // console.log(e.target.result)
      // files = e.target.result

      let formData = new FormData();
      formData.append("fact", value.p_fact);
      formData.append("specific", value.p_specific);
      formData.append("upload", value.p_document[0]);
      formData.append("purpose", value.p_purpose);
      formData.append("format", format);
      formData.append("timelines", value.p_timelines);
      formData.append("user", JSON.parse(userId));
      formData.append("cid", JSON.parse(category));

      axios({
        method: "POST",
        url: `${baseUrl}/post/user/question`,
        data: formData,
      })
        .then(function (response) {
          console.log("res-", response);  
          if (response.data.code === 1) {
            // reset();   
            // alert.success("Query successfully added!"); 
            // props.history.push("/customer/dashboard");       
            }            
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
  
    }

    
  
    
  };


  const SuccessMesg = () => {
    return(
      <>
       <Modal isOpen={modal} toggle={toggle} size="sm">
            <ModalHeader toggle={toggle}>            
            </ModalHeader>
  
            <ModalBody>
              <div class="modal-body">
              <h1 style={{textAlign:"center", fontSize:"1.5rem"}}>UserId : {JSON.parse(uid)}</h1>
              </div>
            </ModalBody>
       
          </Modal>
      </>
    )
  }
  

  return (
    <>
    <Header id={JSON.parse(uid)} />
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
            <div className="mb-3">
            <label className="form-label"> Specific Questions</label>
            <input
              type="text"
              className="form-control"
              name="p_specific"
              ref={register}
              placeholder="Enter Purpose"
            />
            </div>
              
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Upload Your Document</label>
                <input
                  type="file"
                  name="p_document"
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
                    <option value="Production">Production before other Authorities</option>
                    <option value="Others">Others</option>                 
                  </select>            
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
                    value="Softcopy - Word/ Pdf"
                  />
                  <label className="form-check-label">Softcopy - Word/ Pdf</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="p_format_digital"
                    ref={register}
                    value="SoftCopy- Digitally Signed"
                  />
                  <label className="form-check-label">SoftCopy- Digitally Signed</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="p_format_physically"
                    ref={register}
                    value="Printout- Physically Signed"
                  />
                  <label className="form-check-label">Printout- Physically Signed</label>
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


{/* <div className="mb-3">
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
              </div> */}


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