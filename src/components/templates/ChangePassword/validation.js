import * as Yup from "yup";

export const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Must have at least 8 characters.")
    .required("Required."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    `Both passwords must match.`,
  ),
});
