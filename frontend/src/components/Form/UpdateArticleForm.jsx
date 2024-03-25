import { useState } from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { updateArticle } from "../../state/article/thunk";
import { CustomToastContainer, generateErrorToastr, generateSuccessToastr } from "../Toastr";
import Form from "./Form";
import { useNavigate } from "react-router-dom";



const UpdateArticleForm = ({ article }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialPayload = {
        id: article.id,
        title: article.title,
        content: article.content,
        is_premium: article.is_premium,
    }
    const [payload, setPayload] = useState(initialPayload);

    const handleTitleChange = e => setPayload({ ...payload, title: e.target.value })
    const handleContentChange = e => setPayload({ ...payload, content: e.target.value });
    const handlePremiumChange = e => setPayload({ ...payload, is_premium: !payload.is_premium });

    const handleSubmit = () => {
        toast.promise(
            dispatch(updateArticle({ ...payload, updated_at: new Date().toISOString() })),
            {
                pending: "Updating article! Please wait....",
            }
        )
            .then(result => {
                if (!result.error) {
                    generateSuccessToastr("Article updated successfully!! Taking you back to your articles");
                    setTimeout(() => navigate(-1), 3000)
                }
                else {
                    generateErrorToastr("Updation Failed!")
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
                    headerName={"update your article"}
                    headerInfo={
                        "As the writer of this article, you can update your article down below."
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
                    buttonInfo={{ text: "update article" }}
                    onSubmitFunction={handleSubmit}
                />
            </div>
        </>

    )
}

export default UpdateArticleForm