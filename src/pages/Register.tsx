import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { RegisterSchema } from "../validations/auth";
import { RegisterFormValues } from "../types/auth";
import Input from "../components/Input";
import Button from "../components/Button";
import { plusIcon, UserIcon } from "../icons";

const Register = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialValues: RegisterFormValues = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    image: null,
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
    setFieldError: any
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Clear any previous errors
      setFieldError("image", undefined);

      // Create a preview URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      // Store the file in Formik
      setFieldValue("image", file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (values: RegisterFormValues, { setSubmitting }: any) => {
    console.log("Register attempt:", values);
    // Handle register logic here
    setSubmitting(false);
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
            // Check if all required fields are filled
            const isFormValid =
              values.firstName.trim() !== "" &&
              values.lastName.trim() !== "" &&
              values.username.trim() !== "" &&
              values.password.trim() !== "" &&
              values.confirmPassword.trim() !== "";

            return (
              <Form className="" noValidate>
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="w-full border border-light-gray py-[10px] px-3 rounded-md flex items-center justify-between">
                      <div className="rounded-full w-12 h-12 bg-muted flex items-center justify-center overflow-hidden">
                        {selectedImage && !errors.image ? (
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
                    {errors.image && (
                      <p className="text-destructive font-medium text-sm mt-2">
                        {errors.image}
                      </p>
                    )}
                  </div>
                  <Input
                    label="First Name"
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={(value) => {
                      setFieldValue("firstName", value);
                      handleChange({ target: { name: "firstName", value } });
                    }}
                    onBlur={() => handleBlur({ target: { name: "firstName" } })}
                    placeholder="Please enter your first name"
                    error={
                      touched.firstName && errors.firstName
                        ? errors.firstName
                        : ""
                    }
                    required
                  />

                  <Input
                    label="Last Name"
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={(value) => {
                      setFieldValue("lastName", value);
                      handleChange({ target: { name: "lastName", value } });
                    }}
                    onBlur={() => handleBlur({ target: { name: "lastName" } })}
                    placeholder="Please enter your last name"
                    error={
                      touched.lastName && errors.lastName ? errors.lastName : ""
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
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={(value) => {
                      setFieldValue("confirmPassword", value);
                      handleChange({
                        target: { name: "confirmPassword", value },
                      });
                    }}
                    onBlur={() =>
                      handleBlur({ target: { name: "confirmPassword" } })
                    }
                    placeholder="Please re-enter your password"
                    error={
                      touched.confirmPassword && errors.confirmPassword
                        ? errors.confirmPassword
                        : ""
                    }
                    required
                  />
                </div>

                <Button
                  name="Register"
                  type="submit"
                  className="w-full mt-6"
                  disabled={isSubmitting || !isFormValid}
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
