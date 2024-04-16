import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom' 
import { useSelector, useDispatch } from 'react-redux'
import { AdminTitle } from '../../../utils/tools'

import PaginateComponent from './paginate';
import { getPaginateArticles, changeStatusArticle, removeArticle } from '../../../store/actions/articles';

import {
    Modal,
    Button,
    ButtonToolbar,
    ButtonGroup,
    InputGroup,
    FormControl
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'



const AdminArticles = () => {
    const articles = useSelector( state => state.articles );
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [removeAlert,setRemoveAlert] = useState(false);
    const [toRemove,setRemove] = useState(null)

    const handleClose = () =>  setRemoveAlert(false);
    const handleShow = (id=null) => {
        setRemove(id);
        setRemoveAlert(true)
    }

    const goToEdit = (id) => {
        navigate(`/dashboard/articles/edit/${id}`)
    }

    const handleStatusChange = (status, _id) => {
        let newStatus = status === 'draft' ? 'public':'draft';
        dispatch(changeStatusArticle({newStatus,_id}))
    }
 
    const handleDelete = () => {
      dispatch(removeArticle(toRemove))
      .unwrap()
      .finally(()=>{
        setRemoveAlert(false);
        setRemove(null)
      })
    }
    //// PAGINATE FUNC

    const goToPrevPage = (page) => {
        dispatch(getPaginateArticles({page}))
    }

    const goToNextPage = (page) => {
        dispatch(getPaginateArticles({page}))
    }
    useEffect(()=>{
        dispatch(getPaginateArticles({}))
    },[])
    return(
        <>
            <AdminTitle title="Articles"/>
            <div className='articles_table'>
                <ButtonToolbar className='mb-3'>
                    <ButtonGroup className='me-2'>
                        <LinkContainer
                            to="/dashboard/articles/add"
                        >
                            <Button variant='secondary'>Add article</Button>
                        </LinkContainer>
                    </ButtonGroup>
                    
                </ButtonToolbar>

                <>
                
                    <PaginateComponent
                        articles={articles.adminArticles}
                        goToEdit={(id)=>goToEdit(id)}
                        goToPrevPage={(page)=>goToPrevPage(page)}
                        goToNextPage={(page)=>goToNextPage(page)}
                        handleStatusChange={(status,id)=>handleStatusChange(status,id)}
                        handleShow={(id)=>handleShow(id)}
                    />
                
                </>

                <Modal show={removeAlert} onHide={handleClose}> 
                    <Modal.Header closeButton>
                        <Modal.Title>Are you really sure ?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        There is no going back.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                            Oop, close this.
                        </Button>
                        <Button variant='danger' onClick={()=>handleDelete()}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default AdminArticles;