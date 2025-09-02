import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginSchema } from "../validations/auth";
import { LoginFormValues } from "../types/auth";
import { useLogin } from "../hooks/queries";
import { login } from "../store/slices/authSlice";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const loginMutation = useLogin();

  const initialValues: LoginFormValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting, setFieldError }: any
  ) => {
    setError(null);

    try {
      // Use the useLogin hook to login
      const response = await loginMutation.mutateAsync(values);

      // Store login state in Redux
      dispatch(login({ token: response.data.token || null }));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error: any) {
      setError("Invalid username or password");
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
              {error && (
                <p className="text-sm text-destructive font-medium text-center mt-4">
                  {error}
                </p>
              )}
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
