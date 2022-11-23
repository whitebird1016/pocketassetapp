import * as Yup from "yup";

export const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  payout: Yup.string().matches(/^0x[a-fA-F0-9]{40}$/,"Not a valid ethereum address")

  
});
