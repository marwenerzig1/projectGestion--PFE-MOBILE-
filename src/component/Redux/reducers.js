import { SET_USER_ID , SET_USER_NAME , SET_USER_ETAT_RH , SET_USER_PRENOM , SET_USER_ID_POINTAGE , SET_USER_POINTAGE  } from "./actions";

const initialState = {
    id : 0 , 
    etat_rh : 2 ,
    id_pointage : 0 , 
    pointage : 0 , 
    name : '' , 
    prenom : '' , 
    ip_config : '192.168.100.153:8000'
}

function userReducer(state = initialState , action) {
    switch (action.type){
        case SET_USER_NAME :
            return {...state, name: action.payload} ;  
        case SET_USER_ID :
            return {...state, id: action.payload} ;  
        case SET_USER_PRENOM :
            return {...state, prenom: action.payload} ; 
        case SET_USER_ETAT_RH :
            return {...state, etat_rh: action.payload} ; 
        case SET_USER_ID_POINTAGE :
            return {...state, id_pointage: action.payload} ; 
        case SET_USER_POINTAGE :
            return {...state, pointage: action.payload} ; 
        default :
            return state ; 
    }
}

export default userReducer;