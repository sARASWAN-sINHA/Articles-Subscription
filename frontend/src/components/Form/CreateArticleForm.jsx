import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


import Form from "./Form";
import { createArticle } from "../../state/article/thunk"
import { useNavigate } from "react-router-dom";
import { CustomToastContainer, generateErrorToastr } from "../Toastr";

const CreateArticleForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initailPayload = { title: "", content: "", is_premium: false };

  const [payload, setPayload] = useState(initailPayload);

  const handleTitleChange = (e) => {
    setPayload({
      ...payload,
      title: e.target.value,
    });
  }
  const handleContentChange = (e) => {
    setPayload({
      ...payload,
      content: e.target.value,
    })
  }
  const handlePremiumChange = (e) => {
    setPayload({
      ...payload,
      is_premium: !payload.is_premium,
    })
  }

  const handleSubmit = () => {
    toast.promise(
      dispatch(createArticle(payload)),
      {
        pending: "Please wait...",
        error: "Article creation failed!! Please try later!"

      }
    )
      .then(result => {
        if (!result.error) {
          setPayload(initailPayload)
          navigate("/writer/show-articles/me")
        }
        else {
          console.log(result.payload.response.data)
          result.payload.response.data.content.map(errorMessage => {
            generateErrorToastr(errorMessage);
          })
        }
      })
  }

  return (
    <>


      <CustomToastContainer />
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
              value: payload.title,
              changeHandler: handleTitleChange,
            },
            {
              labelName: "Content",
              inputType: "textarea",
              required: true,
              value: payload.content,
              changeHandler: handleContentChange,
            },
          ]}
          checkBoxList={[
            {
              id: "isPremiumCheck",
              value: payload.is_premium,
              message: "Is this a premium article?",
              clickHandler: handlePremiumChange,
            },
          ]}
          buttonInfo={{ text: "create article" }}
          onSubmitFunction={handleSubmit}
        />
      </div>
    </>
  );
};

export default CreateArticleForm;
