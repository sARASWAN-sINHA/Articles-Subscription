import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { userContext } from "../context";

import { CustomToastContainer } from "../components/Toastr";
import { fetchArticles } from "../state/article/thunk";

import ArticleCard from "../components/Card/ArticleCard";
import DashboardCard from "../components/Card/DashboardCard";
import BrowseSubscriptionForm from "../components/Form/BrowseSubscriptionForm";



const DisplayArticles = (props) => {

  const { isLoading, articles } = useSelector(state => state.articleState)
  const userReduxState = useSelector(state => state.userState.user);
  const userContextState = useContext(userContext)[0];
  const initialUserState = userReduxState.id != userContextState.id ? { ...userContextState } : { ...userReduxState }
  const [loggedInUser, _] = useState(initialUserState);
  const dispatch = useDispatch();

  const userSubscription = loggedInUser.subscription;


  const noArticleToShow = () => {
    const emptyArticle =
      props.user.type == "writer" ?
        <DashboardCard
          title={"no articles!"}
          message={"We do not have any article that you might have written! \
                      Go to 'CREATE ARTICLES' to get started!!"
          }
        />
        :
        userSubscription == null ?
          <BrowseSubscriptionForm />
          :
          <DashboardCard
            title={"no articles!"}
            message={`We do not have any ${userSubscription.type == "STD" ? "standard" : "premium"} articles to show you right now!`}
          />
    return emptyArticle;
  }


  useEffect(() => {
    toast.promise(
      dispatch(fetchArticles()),
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
      <div className="absolute inset-44  flex flex-col justify-center items-center gap-3 mt-2 z-20" >
        {
          articles.length ? articles.map((article) =>
            <ArticleCard
              key={article.article_uuid}
              id={article.id}
              title={article.title}
              content={article.content}
              articleType={article.is_premium ? "premium" : "standard"}
              user={loggedInUser}
              createdAt={article.created_at.replaceAll('-', '/')}
              updated_at={article.updated_at}
              uuid={article.article_uuid}
            />
          ) :
            noArticleToShow()
        }
      </div>
    </>
  );
};

export default DisplayArticles;
