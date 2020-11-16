import axios from "../helpers/axios";
import { userConstants } from "./constants";


export const signup = (user) => {

    console.log('user =>', user);

    return async (dispatch) => {

        dispatch({type: userConstants.USER_REGISTER_REQUEST});

        const res = await axios.post('/admin/sign-up',{
            ...user
        });

        if(res.status === 201){
            const { message } = res.data;
            dispatch({
                type: userConstants.USER_REGISTER_SUCCESS ,
                payload: {
                    message
                }
            })
        }else{
            if(res.status === 400){
                console.log(res.data.error)
                dispatch({
                    type: userConstants.USER_REGISTER_FAILURE,
                    payload:{
                        error : res.data.error
                    }
                })
            }
        }
    }
}


