import * as Yup from "yup";

export const LogInSchema = Yup.object().shape({
  name: Yup.string().min(1).max(150).required("Required."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Required."),
  password: Yup.string()
    .min(8, "Must have at least 8 characters.")
    .required("Required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], `Both passwords must match.`)
    .required("Required."),
});
