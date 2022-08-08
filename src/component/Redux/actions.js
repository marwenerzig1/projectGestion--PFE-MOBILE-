export const SET_USER_ID = 'SET_USER_ID' ; 
export const SET_USER_ETAT_RH = 'SET_USER_ETAT_RH' ; 
export const SET_USER_NAME = 'SET_USER_NAME' ; 
export const SET_USER_PRENOM = 'SET_USER_PRENOM' ; 
export const SET_USER_ID_POINTAGE = 'SET_USER_ID_POINTAGE' ; 
export const SET_USER_POINTAGE = 'SET_USER_POINTAGE' ; 

export const setName = name => dispatch => {
    dispatch({
        type: SET_USER_NAME , 
        payload: name , 
    });
}; 

export const setPrenom = prenom => dispatch => {
    dispatch({
        type: SET_USER_PRENOM , 
        payload: prenom , 
    });
};

export const setEtat_RH = etat_rh => dispatch => {
    dispatch({
        type: SET_USER_ETAT_RH , 
        payload: etat_rh , 
    });
};

export const setId = id => dispatch => {
    dispatch({
        type: SET_USER_ID , 
        payload: id , 
    });
};

export const setId_Pointage = id_pointage => dispatch => {
    dispatch({
        type: SET_USER_ID_POINTAGE , 
        payload: id_pointage , 
    });
};

export const setPointage = pointage => dispatch => {
    dispatch({
        type: SET_USER_POINTAGE , 
        payload: pointage , 
    });
};