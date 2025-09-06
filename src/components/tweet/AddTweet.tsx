import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { UserIcon } from "../../icons";
import Button from "../Button";
import Textarea from "../Textarea";
import { useAddTweet } from "../../hooks/queries";
import { TweetFormValues } from "../../types/tweet";
import { tweetValidationSchema } from "../../validations/tweet";




const AddTweet = () => {
  const addTweetMutation = useAddTweet();

  const initialValues: TweetFormValues = {
    text: "",
  };

  const handleSubmit = async (values: TweetFormValues, { resetForm }: any) => {
    try {
      await addTweetMutation.mutateAsync(values.text);
      // Reset form after successful submission
      resetForm();
      // Don't invalidate queries - WebSocket will handle the new tweet
    } catch (error) {
      console.error("Failed to post tweet:", error);
    }
  };

  return (
    <div className="border border-[#C2C2C28C] rounded-lg p-4 ">
      <Formik
        initialValues={initialValues}
        validationSchema={tweetValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting, setFieldValue }) => (
          <Form>
            <div className="flex flex-row gap-3">
              
              <img
                src={UserIcon}
                alt="User"
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
           
              <div className="flex flex-col gap-[14px] flex-1">
                <div className="relative">
                  <Field name="text">
                    {({ field, meta }: any) => (
                      <Textarea
                        name={field.name}
                        value={field.value}
                        onChange={(value: string) => setFieldValue(field.name, value)}
                        onBlur={field.onBlur}
                        placeholder="What's Happening ?"
                        className={`w-full ${
                          meta.error && meta.touched ? "border-red-500" : ""
                        }`}
                        rows={1}
                        maxLength={280}
                        
                      />
                    )}
                  </Field>
                </div>
                <div className="flex flex-row justify-end">
                  
                  <Button
                    type="submit"
                    name={"Post"}
                    className="w-20 text-sm font-medium"
                    disabled={isSubmitting || !values.text.trim()}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTweet;
