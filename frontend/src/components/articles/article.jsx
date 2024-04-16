import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader } from '../../utils/tools';
import ScoreCard from "../../utils/scoreCard";

import { getArticle } from '../../store/actions/articles';


const Article = () => {
    const articles = useSelector(state=>state.articles);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(()=>{
        dispatch(getArticle(id))
    },[id])


    return(
        <>
            { articles && articles.current ?
                <div className="article_container">
                    <div
                        style={{
                            background:`url(https://picsum.photos/1920/1080)`
                        }}
                        className="image"
                    >
                    </div>
                    <h1>{articles.current.title}</h1>
                    <div className="mt-3 content">
                        <div dangerouslySetInnerHTML={
                            {__html: articles.current.content}
                        }>
                        </div>
                    </div>
                    <ScoreCard current={articles.current}/>
                </div>
            :
                <Loader/>
            }
        </>
    )
}

export default Article;