import React from "react";
import { useForm } from "react-hook-form";

function A({interest}) {
  const { handleSubmit, register, errors, reset, setValue } = useForm();

  return (
    <div>
      <select class="form-control" 
      ref={register}
       name={interest}
       >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}

export default A;
