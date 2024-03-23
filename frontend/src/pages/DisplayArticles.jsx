import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { userContext } from "../context";

import { CustomToastContainer } from "../components/Toastr";
import { fetchArticles } from "../state/article/thunk";

import ArticleCard from "../components/Card/ArticleCard";

const DisplayArticles = (props) => {

  const { isLoading, articles } = useSelector(state => state.articles)
  const [loggedInUser, _] = useContext(userContext);
  const dispatch = useDispatch();

  useEffect(() => {
    toast.promise(
      dispatch(fetchArticles()) ,
      {
        success: "Articles fetched succesfully!",
        pending: "Fetching related records...",
        error: "Failed to fetch data!!"
      }
    );
  }, []);

  return (
    <>
      <CustomToastContainer />
      <div className="flex flex-col justify-center items-center gap-3">
        {
          articles.map((article) =>
            <ArticleCard
              key={article.article_uuid}
              id={article.id}
              title={article.title}
              content={article.content}
              articleType={article.is_premium ? "premium" : "standard"}
              user={loggedInUser}
              createdAt={article.created_at.replaceAll('-', '/')}
            />
          )
        }
      </div>
    </>
  );
};

export default DisplayArticles;
