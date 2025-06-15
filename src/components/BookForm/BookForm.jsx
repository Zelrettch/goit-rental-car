import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./BookForm.module.css";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  bookingDate: Yup.date().required("Date is required"),
  comment: Yup.string(),
});

export default function BookForm() {
  const initialValues = {
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        toast.success("Booking request sent successfully!");
        resetForm();
      }}
    >
      <Form className={css.form}>
        <h2 className={css.title}>Book your car now</h2>
        <p className={css.subtitle}>
          Stay connected! We are always ready to help you.
        </p>

        <div className={css.inputWrapper}>
          <Field
            type="text"
            name="name"
            placeholder="Name*"
            className={css.input}
          />
          <ErrorMessage name="name" component="div" className={css.error} />
        </div>

        <div className={css.inputWrapper}>
          <Field
            type="email"
            name="email"
            placeholder="Email*"
            className={css.input}
          />
          <ErrorMessage name="email" component="div" className={css.error} />
        </div>

        <div className={css.inputWrapper}>
          <Field type="date" name="bookingDate" className={css.input} />
          <ErrorMessage
            name="bookingDate"
            component="div"
            className={css.error}
          />
        </div>

        <div className={css.inputWrapper}>
          <Field
            as="textarea"
            name="comment"
            placeholder="Comment"
            className={css.textarea}
          />
        </div>

        <button type="submit" className={css.button}>
          Send
        </button>
      </Form>
    </Formik>
  );
}
