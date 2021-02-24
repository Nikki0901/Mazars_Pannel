import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";

export default function ProposalComponent() {
  const alert = useAlert();
  const { register, handleSubmit, reset } = useForm();

  const [incompleteData, setInCompleteData] = useState([]);
  const userid = window.localStorage.getItem("tpkey");

  const [assing, setAssing] = useState(null);
  const [custname, setCustName] = useState();

  const [files, setFiles] = useState([]);

  useEffect(() => {
    const getCompleteAssingment = () => {
      axios
        .get(`${baseUrl}/get/tp/pending/tp/${JSON.parse(userid)}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setInCompleteData(res.data.result);
          }
        });
    };

    getCompleteAssingment();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${baseUrl}/get/allname/${assing}`);
      console.log("res", res.data.result);
      {Object.entries(res.data.result).map(([key, value]) => {
        console.log("val",value.name)
        setCustName(value.name)
      })}
    };

    getUser();
  }, [assing]);

  const onSubmit = (value) => {
    console.log(value);

    let file_reader = new FileReader();
    let file = value.p_image[0];

    file_reader.onload = () => {
      setFiles([...files, 
        { 
        uploaded_file: file_reader.result }]);
    };

    file_reader.readAsDataURL(file);
    console.log(files)
    // let formData = new FormData();
    // formData.append("assignno", value.p_assingment);
    // formData.append("name", value.p_name);
    // formData.append("upload", value.p_image[0]);
    // formData.append("type", "tp");
    // formData.append("id", JSON.parse(userid));

    // axios({
    //   method: "POST",
    //   url: `${baseUrl}/post/uploadproposal/tl/tp`,
    //   data: formData,
    // })
    //   .then(function (response) {
    //     console.log("res-", response);
    //     if (response.data.code === 1) {
    //       alert.success("proposal successfully added !");
    //       reset();
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("erroror - ", error);
    //   });
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
                    onChange={(e) => setAssing(e.target.value)}
                  >
                    <option value="">--select--</option>
                    {incompleteData.map((p, index) => (
                      <option key={index} value={p.assignno}>
                        {p.assignno}
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

            <div class="col-md-6">
              <div class="form-group">
                <label>Proposal File</label>
                <input type="file" name="p_image" ref={register} />
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
