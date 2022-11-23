import * as Yup from "yup";

export const TemplateSchema = Yup.object().shape({
  title: Yup.string().required("Required."),
});
