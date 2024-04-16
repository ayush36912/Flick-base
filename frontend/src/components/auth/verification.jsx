import { useEffect } from 'react';
import { Loader } from '../../utils/tools';
import {useDispatch} from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'

import { accountVerify } from '../../store/actions/users';


const AccountVerify = () => {
    const dispatch =  useDispatch();
    const [search,setSearch] = useSearchParams();
    const navigate = useNavigate();
    const token = search.get('t');

    useEffect(()=>{
        if(token){
            dispatch(accountVerify(token))
            .unwrap()
            .finally(()=>{
                navigate('/')
            })
        } else{
            navigate('/')
        }
    },[dispatch,navigate])


    /// http://localhost:3001/verification?t=TOKEN

    return(
        <>
            <Loader/>
        </>
    )
}

export default AccountVerify;