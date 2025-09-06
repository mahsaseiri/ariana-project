import * as Yup from "yup";

// Validation schema for tweet form
export const tweetValidationSchema = Yup.object({
    text: Yup.string()
      .required("Tweet content is required")
      .min(1, "Tweet must be at least 1 character")
      .max(280, "Tweet cannot exceed 280 characters")
      .trim(),
  });
  