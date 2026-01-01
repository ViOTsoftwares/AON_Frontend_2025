import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { toastMessage } from "../toastMessage";
import { contactUsValidation } from "../helper/Validation";
import { CreateContactUsApi } from "../Api_Action";
const ContactusForm = () => {
  const initialValues = { name: "", phone: "", email: "", message: "" };
  const [FormValue, setFormValue] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState({});
  const { email, message, name, phone } = FormValue;
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormValue((pre) => ({ ...pre, [name]: value }));
    if (value) {
      setError((pre) => ({ ...pre, [name]: "" }));
    }
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const err = await contactUsValidation(FormValue);
      if (Object.keys(err).length > 0) {
        setError(err);
        setLoading(false);
        return;
      }
      console.log("api..");
      const response = await CreateContactUsApi(FormValue);
      console.log(response);
      if (response.success) {
        setFormValue(initialValues);
        setLoading(false);
        toastMessage(response.message, "success");
      } else {
        setLoading(false);
        toastMessage(response.message, "error");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toastMessage("Somthing went wrong", "error");
    }
  };

  const TextFieldStyle = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#8a0707",
          borderWidth: "3px",
        },
      },
      "& .MuiInputLabel-outlined": {
        color: "#2e2e2e",
        fontWeight: "bold",
        "&.Mui-focused": {
          color: "secondary.main",
          fontWeight: "bold",
        },
      },
    },
  };
  return (
    <div>
      {" "}
      <Stack rowGap={2}>
        <TextField
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Name"
          sx={{ ...TextFieldStyle }}
        />
        {Error?.name ? <p style={{ color: "red" }}>{Error?.name}</p> : ""}
        <TextField
          name="phone"
          type="number"
          value={phone}
          onChange={handleChange}
          placeholder="Phone number"
          sx={{ ...TextFieldStyle }}

        />
        {Error?.phone ? <p style={{ color: "red" }}>{Error?.phone}</p> : ""}
        <TextField
          name="email"
          value={email}
          type="email"
          onChange={handleChange}
          placeholder="Email ID"
          sx={{ ...TextFieldStyle }}

        />
        {Error?.email ? <p style={{ color: "red" }}>{Error?.email}</p> : ""}
        <TextField
          name="message"
          value={message}
          onChange={handleChange}
          placeholder="What's your needs"
          multiline
          rows={5}
          sx={{ ...TextFieldStyle }}

        />
        {Error?.message ? <p style={{ color: "red" }}>{Error?.message}</p> : ""}

        <Button
          variant="contained"
          sx={{ height: "48px", backgroundColor: "#8a0707" }}
          onClick={handleSubmit}
        >
          {loading ? "Loading" : "Submit"}
        </Button>
      </Stack>
    </div>
  );
};

export default ContactusForm;
