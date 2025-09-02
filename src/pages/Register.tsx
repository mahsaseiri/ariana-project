import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { RegisterSchema } from "../validations/auth";
import { RegisterFormValues } from "../types/auth";
import Input from "../components/Input";
import Button from "../components/Button";
import { plusIcon, UserIcon } from "../icons";
import { useRegister } from "../hooks/queries";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const initialValues: RegisterFormValues = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirm_password: "",
    avatar: null,
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
    setFieldError: any
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Clear any previous errors
      setFieldError("avatar", undefined);

      // Create a preview URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      // Store the file in Formik
      setFieldValue("avatar", file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting, setFieldError }: any
  ) => {
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("confirm_password", values.confirm_password);

      // Append avatar file if selected
      if (values.avatar) {
        formData.append("avatar", values.avatar);
      }

      // Call the register mutation
      const response = await registerMutation.mutateAsync(formData);
      dispatch(login({ token: response.data.token || null }));
      // Navigate to login page on success
      navigate("/dashboard");
    } catch (error: any) {
      if (error?.response?.data?.non_field_errors) {
        setFieldError("username", error?.response?.data?.non_field_errors[0]);
      } else {
        setError("Registration failed. Please try again.");
      }

      // Handle error (you might want to show a toast notification here)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="w-full md:w-[384px] md:border md:border-light-gray px-6 pb-6 rounded-lg">
        <div className="text-center flex justify-center p-6">
          <img className="w-auto" src="/logo.svg" alt="Logo" />
        </div>
        <div className="flex flex-col gap-3 py-6">
          <h2 className="text-2xl font-semibold text-foreground">Sign Up</h2>
          <p className="text-sm text-muted-foreground">
            Enter your information to create an account.
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            setFieldError,
            handleChange,
            handleBlur,
          }) => {
            // Check if all required fields are filled and no validation errors
            const isFormValid =
              values.first_name.trim() !== "" &&
              values.last_name.trim() !== "" &&
              values.username.trim() !== "" &&
              values.password.trim() !== "" &&
              values.confirm_password.trim() !== "" &&
              Object.keys(errors).length === 0;

            return (
              <Form className="" noValidate>
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="w-full border border-light-gray py-[10px] px-3 rounded-md flex items-center justify-between">
                      <div className="rounded-full w-12 h-12 bg-muted flex items-center justify-center overflow-hidden">
                        {selectedImage && !errors.avatar ? (
                          <img
                            src={selectedImage}
                            alt="User"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img src={UserIcon} alt="User" />
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                          handleImageUpload(event, setFieldValue, setFieldError)
                        }
                        className="hidden"
                      />
                      <Button
                        name="Upload"
                        type="button"
                        className="w-auto bg-white border border-light-gray !text-primary"
                        rightIcon={<img src={plusIcon} alt="User" />}
                        onClick={handleUploadClick}
                      />
                    </div>
                    {errors.avatar && (
                      <p className="text-destructive font-medium text-sm mt-2">
                        {errors.avatar}
                      </p>
                    )}
                  </div>
                  <Input
                    label="First Name"
                    type="text"
                    name="first_name"
                    value={values.first_name}
                    onChange={(value) => {
                      setFieldValue("first_name", value);
                      handleChange({ target: { name: "first_name", value } });
                    }}
                    onBlur={() =>
                      handleBlur({ target: { name: "first_name" } })
                    }
                    placeholder="Please enter your first name"
                    error={
                      touched.first_name && errors.first_name
                        ? errors.first_name
                        : ""
                    }
                    required
                  />

                  <Input
                    label="Last Name"
                    type="text"
                    name="last_name"
                    value={values.last_name}
                    onChange={(value) => {
                      setFieldValue("last_name", value);
                      handleChange({ target: { name: "last_name", value } });
                    }}
                    onBlur={() => handleBlur({ target: { name: "last_name" } })}
                    placeholder="Please enter your last name"
                    error={
                      touched.last_name && errors.last_name
                        ? errors.last_name
                        : ""
                    }
                    required
                  />

                  <Input
                    label="Username"
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={(value) => {
                      setFieldValue("username", value);
                      handleChange({ target: { name: "username", value } });
                    }}
                    onBlur={() => handleBlur({ target: { name: "username" } })}
                    placeholder="Please enter username"
                    error={
                      touched.username && errors.username ? errors.username : ""
                    }
                    required
                  />

                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={(value) => {
                      setFieldValue("password", value);
                      handleChange({ target: { name: "password", value } });
                    }}
                    onBlur={() => handleBlur({ target: { name: "password" } })}
                    placeholder="Please enter password"
                    error={
                      touched.password && errors.password ? errors.password : ""
                    }
                    required
                  />

                  <Input
                    label="Confirm Password"
                    type="password"
                    name="confirm_password"
                    value={values.confirm_password}
                    onChange={(value) => {
                      setFieldValue("confirm_password", value);
                      handleChange({
                        target: { name: "confirm_password", value },
                      });
                    }}
                    onBlur={() =>
                      handleBlur({ target: { name: "confirm_password" } })
                    }
                    placeholder="Please re-enter your password"
                    error={
                      touched.confirm_password && errors.confirm_password
                        ? errors.confirm_password
                        : ""
                    }
                    required
                  />
                </div>
                {error && (
                  <div className="text-center text-sm text-red-600 mt-4">
                    <p className="">Registration failed. Please try again.</p>
                  </div>
                )}
                <Button
                  name={
                    registerMutation.isPending ? "Registering..." : "Register"
                  }
                  type="submit"
                  className="w-full mt-6"
                  disabled={
                    isSubmitting || !isFormValid || registerMutation.isPending
                  }
                />
              </Form>
            );
          }}
        </Formik>

        <div className="text-center text-sm text-black mt-4">
          <p className="">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
