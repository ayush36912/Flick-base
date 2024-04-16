import { Navigate, useLocation } from 'react-router-dom'

const PreventSingIn = (props) => {
    let location = useLocation();

    return(
        <>
            { props.users.auth ?
                <Navigate to="/dashboard" state={{from:location}} replace/>
            :
                props.children
            }
        </>
    )
}

export default PreventSingIn;