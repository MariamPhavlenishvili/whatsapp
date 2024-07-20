import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
});

export type UserForm = {
  name: string;
  email: string;
};

export const signupSchema = Yup.object({
  name: Yup.string()
    .trim()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .min(3, "Must be at least 3 characters")
    .max(40, "Must be maximum 40 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is required"),
});
