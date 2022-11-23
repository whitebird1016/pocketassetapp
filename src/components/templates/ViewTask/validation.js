import * as Yup from "yup";

export const CommentSchema = Yup.object().shape({
  comment: Yup.string().min(1, "Comment is required.").required("Required."),
});
