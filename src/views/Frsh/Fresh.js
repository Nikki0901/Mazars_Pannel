import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";



const defaultValues = {
  test: [
    {
      query: ""
    },
  ]
};


function Fresh() {
  const [specific, setSpecific] = useState([]);
  const userId = window.localStorage.getItem("userid");
  const { register, control, handleSubmit, reset,  } = useForm({
    defaultValues
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  

  useEffect(() => {
    getQuery();
  }, []);

  const getQuery = () => {
    axios.get(`${baseUrl}/customers/getQueryDetails?id=123`).then((res) => {
      console.log(res);
      console.log("result", res.data.result[0]);
      var specific = res.data.result[0].specific_query;
      var a = JSON.parse(specific)
      // setSpecific(JSON.parse(specific));
      // reset(specific)
      reset({ test: a });
    });
  };

  console.log("specific", specific)

  const onSubmit = (data) => console.log("data", data);

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          {fields.map((item, index) => {
            return (
              <li key={item.id}>
                <input
                  name={`test[${index}].query`}
                  defaultValue={`${item.query}`}
                  ref={register({ required: true })}
                />
                <button onClick={() => remove(index)}>Delete</button>
              </li>
            );
          })}
        </ul>
        <section>
          <button
            type="button"
            onClick={() => {
              append({ name: "append" });
            }}
          >
            append
          </button>

          <button type="button" onClick={() => remove(1)}>
            remove at
          </button>
        </section>

        <input type="submit" />
      </form>
    </Layout>
  );
}

export default Fresh;

// React.useEffect(() => {
//   reset({
//     test: [{ name: "useFieldArray" }, { name: "useFieldArray2" }],
//   });
// }, []);
