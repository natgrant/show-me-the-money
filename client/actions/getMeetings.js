import request from 'superagent'

export const SHOW_ERROR = 'SHOW_ERROR'
export const REQUEST_MEETINGS = 'REQUEST_MEETINGS'
export const RECEIVE_MEETINGS = 'RECEIVE_MEETINGS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_MEETING = 'SAVE_MEETING'

export const loading = () => {
    return {
        type: REQUEST_MEETINGS,
        loading: true
    }
}

export const receiveMeetings = meetings => {
    return {
        type: RECEIVE_MEETINGS,
        meetings: meetings,
        loading: false
    }
}

export const requestMeetings = meetings => {
    return {
        type: RECEIVE_MEETINGS,
        meetings: meetings,
        loading: false
    }
}

export const receiveUsers = users => {
    return {
        type: RECEIVE_USERS,
        users: users,
        loading: false
    }
}

export const sendMeeting = meeting => {
    return {
        type: SAVE_MEETING,
        meeting: meeting,
        loading: false
    }
}

export const showError = (errorMessage) => {
    return {    
        type: SHOW_ERROR,
        errorMessage: errorMessage,
        loading: false
    }
}

export function getAllMeetings() {
    return dispatch => {
        dispatch(loading())
        return request
        .get('api/meetings')
        .then(res => {
            dispatch(receiveMeetings(res.body))})
        .catch(err => {
            dispatch(showError(err.message))
    })
}}

export function getMeetingById(meetingId) {
    return dispatch => {
        dispatch(loading())
        return request
        .get(`api/meetings/${meetingId}`)
        .then(res => {
            if(!res.body.length == 1) {
                dispatch(showError('nothing g'))
            } else {
                dispatch(receiveMeetings(res.body))
            }
        })
        .catch(err => {
            dispatch(showError(err.message))
    })
}}

export function getUsersByMeeting(meetingId) {
    return dispatch => {
        dispatch(loading())
        return request
        .get(`api/meetings/${meetingId}/users`)
        .then(res => {
            dispatch(receiveUsers(res.body))})
        .catch(err => {
            dispatch(showError(err.message))
        })
    }
}


export function saveMeeting(meeting) {
    console.log(meeting);
    return dispatch => {
      dispatch(loading());
      return request
        .post(`/api/v1/meetings/save`, meeting)
        .then(res => {
            dispatch(receiveMeetings(res.body))})
        .catch(err => {
            dispatch(showError(err.message))
        })
    };
}