import React from "react";
import Form from "./Form";

const CreateArticleForm = () => {
  const handleSubmit = () => {};
  return (
    <div className="flex justify-center items-center">
      <Form
        headerName={"create an article"}
        headerInfo={
          "As a writer you can post both standard and premium articles dowm below."
        }
        labels={[
          {
            labelName: "Title",
            inputType: "text",
            required: true,
          },
          {
            labelName: "Content",
            inputType: "textarea",
            required: true,
          },
        ]}
        checkBoxList={[
          {
            id: "isPremiumCheck",
            value: true,
            message: "Is this a premium article?",
          },
        ]}
        buttonInfo={{ text: "create article" }}
        onSubmitFunction={handleSubmit}
      />
    </div>
  );
};

export default CreateArticleForm;
