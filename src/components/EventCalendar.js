import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import styles from './style.module.css';

const locales = {
    "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const EventCalendar = (props) => {
    // states
    const [modal, setModal] = useState(false)
    const [state, setState] = useState({title: '', description: '', start: '', end: ''})
    const [events, setEvents] = useState([])
    const [date, setDate] = useState('');
    const [date1, setDate1] = useState('');

    const getData = () => {
        fetch("http://localhost:8000/events").then((res) => {
            return res.json();
        }).then((resp) => {
            setEvents(resp)
            debugger
        }).catch((err) => {
            console.log(err.message);
        })
    }

    const handleEvent = e => {
        // check all validation
        if(state.title == '' || state.description == '' || state.start == '' || state.end == ''){
            alert("All inputs are required")
            return
        }

        e.preventDefault()
        let bgcolor = `#${Math.floor(Math.random()*16777215).toString(16)}`
        let data = {...state, bgcolor}
        fetch("http://localhost:8000/events",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(data)
      }).then((res)=>{
        getData()
        setState({title: '', description: '', start: '', end: ''})
        setDate('')
        setDate1('')
      }).catch((err)=>{
        console.log(err.message)
      })
      setModal(false)
    }

    useEffect(() => {
        getData()
    }, []);

    // const handleEvent = () => {
    //     console.log(state)
    //     //debugger
    //     setModal(false)
    //     setEvents([...events, state])
    //     setState({title: '', description: '', start: '', end: ''})
    // }

    const handleInputs = (e) => {
        setState({...state, description: e.target.value})
    }

    const handleChange = (date, i) => {
        setDate(date)
        setState({...state, start: new Date(date)})
    }

    const handleChange1 = (date, i) => {
        console.log(date)
        // debugger
        setDate1(date)
        setState({...state, end: new Date(date)})
    }


    const handleSelectEvent = (e) => {
        alert(e.description)
        console.log(e)
        debugger
    }

    const handleSelectSlot = () => {
        setModal(true)
    }

    function eventStyleGetter(event) {
        console.log(event)
        // debugger
        return {
            style: {
                backgroundColor: event.bgcolor ? event.bgcolor : "#216ba5"
            }
        };
    }

    return (<>
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor={event => {
                return new Date(event.start)
            }}
            endAccessor={event => {
                return new Date(event.end)
            }}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            eventPropGetter={(eventStyleGetter)}
            selectable
            style={{ height: 500, color: '#41464b' }}
        />
        <Modal show={modal} contentClassName={styles.customClass}>
            <Modal.Header>
                <Modal.Title>Add Event</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <div className={styles.modal_div}>
                        <div className={styles.inner_div}>
                            <label>Title</label>
                            <select className={styles.select1} onChange={e => setState({...state, title: e.target.value})}>
                            <option selected disabled>Select Title</option>
                            <option key='Tillage' value='Tillage'>Tillage</option>
                            <option key='Planting' value='Planting'>Planting</option>
                            <option key='Fetilization' value='Fetilization'>Fetilization</option>
                            <option key='Spraying' value='Spraying'>Spraying</option>
                            <option key='Harvesting' value='Harvesting'>Harvesting</option>
                            <option key='Planned Cost' value='Planned Cost'>Planned Cost</option>
                            <option key='Other' value='Other'>Other</option>
                            </select>


                        </div>
                        <div className={styles.inner_div}>
                            <label>Description</label>
                            <input value={state.description} onChange={handleInputs} className={styles.modal_input} />
                        </div>
                    </div>
                    <div className={styles.modal_div}>
                        <div className={styles.inner_div}>
                            <label>Start Date</label>
                            <DatePicker
                            peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" 
                            selected={date} value={state.start}
                            onChange={handleChange} placeholderText="MM-DD-YYYY" />
                        </div>
                        <div className={styles.inner_div}>
                            <label>End Date</label>
                            <DatePicker
                            peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" 
                            selected={date1} value={state.end}
                            onChange={handleChange1} placeholderText="MM-DD-YYYY" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer><Button variant="secondary" style={{marginRight: 20}} onClick={handleEvent}>
                        Add Event
                    </Button>
                    <Button variant="secondary" onClick={e => {setState({title: '', description: '', start: '', end: ''});setModal(false)}}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
       )
}

export default EventCalendar