import * as Yup from "yup";

// Login validation schema
export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required("Username is required")
    .min(1, "Username must be at least 1 character")
    .max(150, "Username must be 150 characters or fewer")
    .matches(
      /^[a-zA-Z0-9@./+\-_]+$/,
      "Username can only contain letters, digits and @/./+/-/_ only"
    ),
  password: Yup.string()
    .required("Password is required")
    .min(1, "Password must be at least 1 character"),
});

// Register validation schema
export const RegisterSchema = Yup.object().shape({
  first_name: Yup.string()
    .trim()
    .min(1, "First name must be at least 1 character")
    .max(150, "First name must be less than 150 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces")
    .required("First name is required"),
  last_name: Yup.string()
    .trim()
    .min(1, "Last name must be at least 2 character")
    .max(150, "Last name must be less than 150 characters")
    .matches(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces")
    .required("Last name is required"),
  username: Yup.string()
    .trim()
    .min(1, "Username must be at least 1 character")
    .max(150, "Username must be 150 characters or fewer")
    .matches(
      /^[a-zA-Z0-9@./+\-_]+$/,
      "Username can only contain letters, digits and @/./+/-/_ only"
    )
    .required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])/,
      "Password must contain at least one lowercase letter"
    )
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .matches(/^(?=.*\d)/, "Password must contain at least one number")
    .matches(
      /^(?=.*[@$!%*?&])/,
      "Password must contain at least one special character (@$!%*?&)"
    )
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  avatar: Yup.mixed()
    .nullable()
    .test("fileType", "Please select an image file", (value) => {
      if (!value) return true; // Allow empty/null values (not required)
      return value instanceof File && value.type.startsWith("image/");
    })
    .test("fileSize", "Image size must be less than 5MB", (value) => {
      if (!value) return true; // Allow empty/null values (not required)
      return value instanceof File && value.size <= 5 * 1024 * 1024; // 5MB limit
    }),
});
