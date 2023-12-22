import React, { useEffect, useState } from 'react'
import { userNavigate } from "react-router-dom";
import { GetLoggedInUserDetails} from '../apicalls/users';
import { message } from 'antd';
import { HideLoading, ShowLoading } from '../redux/loadersSlice';
function ProtectedRoute({children}) {
     const navigate = useNavigate();
    //  const [user, setUser] = useState(null);

    const {user} = useSelector(state=> state.users)
    const dispatch = useDispatch();

     const validateUserToken = async () => {
         try {

          dispatch(ShowLoading())
           const response = await GetLoggedInUserDetails(); 
           dispatch(HideLoading())
           if(response.success){
                dispatch(SetUser(response.data));
           }else{
            message.error(response.message);
           }
         } catch (error) {
          dispatch(HideLoading())
           message.error(error.message);
         }

     }

   useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
        navigate("/login");
    }else{
        validateUserToken();
    }
   }, [])


  return (
    <div>
      {user && (
      <div className="p-1">
      <div className="header p-2 bg-primary flex justify-between rounded item-center">
<h1 className="text-2xl text-white font-bold">
  Library
</h1>
<div className="flex item-center gap-1 bg-white p-1 rounded">
<i className="ri-shield-user-line"></i>  
<span className="text-sm underline"
onClick={()=> navigate("/profile")}
>{user.name.toUpperCase()}</span>
<i className="ri-logout-box-r-line ml-2"></i>
</div>
      </div>
       <div className="content mt-1">
        {children}
       </div>
       </div>
        )}

      
    </div>
    );
  
}

export default ProtectedRoute
