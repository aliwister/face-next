import React from "react";
import Input from "@material-ui/core/Input";
import { useForm } from "react-hook-form";

//import "./styles.css";

export default function AddProduct() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
  };
  console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Example</label>
      <Input name="example" defaultValue="test" ref={register} />
      <label>ExampleRequired</label>
      <Input
        name="exampleRequired"
        ref={register({ required: true, maxLength: 10 })}
      />
      {errors.exampleRequired && <p>This field is required</p>}
      <Input type="submit" />
    </form>
  );
}
