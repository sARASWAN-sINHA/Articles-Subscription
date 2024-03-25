import React from "react";
import { useDispatch } from "react-redux";
import { deleteArticles } from "../../state/article/thunk";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const ArticleCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, user, title, content, createdAt, articleType, uuid, updated_at } = props;
  return (
    <>
      <div className="w-[65%] p-2 flex flex-col gap-7 items-center rounded-2xl bg-white my-2">
        <h1 className="text-2xl">{title.toUpperCase()}</h1>
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <div className="text-gray-500 py-0 px-2.5 h-full w-3/4 text-center">
            <div className="text-justify my-2">{content}</div>
            <div className="text-left">{createdAt.substring(0, 10)}</div>
            <div className="text-left my-2">{articleType.toUpperCase()}</div>
          </div>
          <hr className="w-4/5" />
          {user.is_writer ? (
            <>
              <button className="w-2/3 bg-blue-600 text-white p-5"
                onClick={() => {
                  toast.promise(
                    navigate(`/writer/update-article/${uuid}`),
                    {
                      pending: "Please wait..while we move you to the update page!",
                      error: "Something went wrong...Try again in some time!!!"
                    }
                  )
                }}

              >
                UPDATE ARTICLE
              </button>
              <button className="w-2/3   bg-orange-600 text-white p-5" onClick={() => {
                toast.promise(
                  dispatch(deleteArticles(id)),
                  {
                    pending: "Deleting Article!",
                    success: "Article Deleted!",
                    error: "Failed to delete article"
                  }
                )
              }}>
                DELETE ARTICLE
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

    </>
  );
};

export default ArticleCard;
