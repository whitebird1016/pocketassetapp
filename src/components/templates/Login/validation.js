import * as Yup from "yup";

export const LogInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Required."),
  password: Yup.string()
    .min(8, "Must have at least 8 characters.")
    .required("Required."),
  // confirmPasswordf: Yup.string().oneOf(
  //   [Yup.ref("password")],
  //   `Password didn't match, please enter again.`,
  // ),
});
