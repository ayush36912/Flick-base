import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { homeLoadMore } from '../../store/actions/articles'
import ArticleCard from '../../utils/articleCard';

// mui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'



const Home = () => {
    const articles = useSelector( state=> state.articles);
    const dispatch = useDispatch();


    useEffect(()=>{
        if(articles.articles.length <= 0){
            dispatch(homeLoadMore(articles.homeSort))
        }
    },[])


    const getNextArticles = () => {
        let skip = articles.homeSort.skip + articles.homeSort.limit;
        dispatch(homeLoadMore({...articles.homeSort, skip:skip}))
    }

    return(
        <>
            <Grid container spacing={2} className="article_card">
                { articles && articles.articles ?
                    articles.articles.map(item=>(
                        <Grid key={item._id} item xs={12} sm={6} lg={3}>
                            <ArticleCard article={item}/>
                        </Grid>
                    ))
                :null}
            </Grid>
            <hr/>
            <Button 
                variant='outlined'
                onClick={getNextArticles}
            >
                Load more    
            </Button>    
        </>
    )
}

export default Home;