import * as Yup from "yup";

export const TaskSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  energy_assigned: Yup.number().min(
    1,
    "Please select energy to assign (1 energy = 30 mins)",
  ),
});
