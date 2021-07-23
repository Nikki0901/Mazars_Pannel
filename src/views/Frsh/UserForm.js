import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import states from "./states.json";

export default function UserForm({ data }) {
  const { register, handleSubmit, reset } = useForm();

  const { cat_id , name } = data;
  console.log("cart", cat_id);

  useEffect(() => {
    // This would be a GET call to an endpoint
    
    reset({
      street: "nks",
      state: "1",
    });
  }, [reset]);

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Street:</label>
          <input name="street" ref={register} />
        </div>

        <div>
          <label>State:</label>
          <select name="state" ref={register}>
            <option key="" value="" />
            {/* {states.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))} */}
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
