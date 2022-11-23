import * as Yup from "yup";

export const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  
});
