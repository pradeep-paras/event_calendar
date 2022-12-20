import { CREATE_EVENT, FETCH_EVENTS } from './events';

export const addEvent = (data) => {
    return (dispatch) => {
        debugger
        fetch("http://localhost:8000/events",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(data)
      }).then((res)=>{
        // dispatch()
        debugger
        dispatch(fetchEvents())
        // setState({title: '', description: '', start: '', end: ''})
        // setDate('')
        // setDate1('')
      }).catch((err)=>{
        console.log(err.message)
      })
    }
}

export const getEvents = events => {
    return {
        type: FETCH_EVENTS,
        events: events
    }
}

export const fetchEvents = () => {
    return (dispatch) => {
        fetch("http://localhost:8000/events").then((res) => {
            return res.json();
        }).then((resp) => {
            dispatch(getEvents(resp))
            debugger
        }).catch((err) => {

        })
    }
}