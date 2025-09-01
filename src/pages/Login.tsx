import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema } from "../validations/auth";
import { LoginFormValues } from "../types/auth";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  const navigate = useNavigate();

  // Hardcoded credentials for testing
  const TEST_USERNAME = "admin";
  const TEST_PASSWORD = "password123";

  const initialValues: LoginFormValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (
    values: LoginFormValues,
    { setSubmitting, setFieldError }: any
  ) => {
    console.log("Login attempt:", values);

    // Check hardcoded credentials
    if (
      values.username === TEST_USERNAME &&
      values.password === TEST_PASSWORD
    ) {
      console.log("Login successful! Redirecting to dashboard...");
      // Store login state in localStorage for persistence
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem(
        "user",
        JSON.stringify({ username: values.username })
      );

      // Redirect to dashboard
      navigate("/dashboard");
    } else {
      console.log("Login failed: Invalid credentials");
      setFieldError("password", "Invalid username or password");
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="w-full md:w-[384px] md:border md:border-light-gray px-6 pb-6 rounded-lg">
        <div className="text-center flex justify-center p-6">
          <img className="w-auto" src="/logo.svg" alt="Logo" />
        </div>
        <div className="flex flex-col gap-3 py-6">
          <h2 className="text-2xl font-semibold text-foreground">Login</h2>
          <p className="text-sm text-muted-foreground">
            Enter your username and password to login to your account.
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ values, errors, touched, isSubmitting, setFieldValue }) => (
            <Form className="" noValidate>
              <div className="flex flex-col gap-4">
                <Input
                  label="Username"
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={(value) => setFieldValue("username", value)}
                  placeholder="Please enter your username"
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
                  onChange={(value) => setFieldValue("password", value)}
                  placeholder="please enter your password"
                  error={
                    touched.password && errors.password ? errors.password : ""
                  }
                  required
                />
              </div>

              <Button
                name="Login"
                type="submit"
                className="w-full mt-6"
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>

        <div className="text-center text-sm text-black mt-4">
          <p className="">
            Don't have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
