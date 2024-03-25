import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

import UpdateArticleForm from '../components/Form/UpdateArticleForm';

const UpdateArticle = () => {
    const params = useParams();
    const articleUuid = params.uniqueId;

    const articleToUpdate = useSelector(state => state.articleState.articles.find(article => article.article_uuid == articleUuid));
    console.log(articleToUpdate);
    return (
        <UpdateArticleForm article={articleToUpdate} />
    )
}

export default UpdateArticle