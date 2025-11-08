export const contactUsValidation = (value) => {
  const error = {};
  if (!value.name || value.name.trim() === "") {
    error.name = "Name is required";
  }
  if (!value.phone || value.phone.trim() === "") {
    error.phone = "Phone is required";
  } else if (!/^\+?[0-9]{10,15}$/.test(value.phone)) {
    error.phone = "Invalid phone number (must be 7–15 digits)";
  }
  if (!value.email || value.email.trim() === "") {
    error.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
    error.email = "Invalid email format";
  }
  if (!value.message || value.message.trim() === "") {
    error.message = "Message is required";
  }

  return error;
};
