import {useState, useEffect} from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const EditExercise = props => {

    const { id } = props.match.params

    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState(0)
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([])

    useEffect(()=>{ 

        // Get user list
        axios.get('http://localhost:5000/users/')
          .then(res => {
            if (res.data.length > 0) {
              setUsers(res.data.map(user => user.username))
            }
          })
        
        // Get exercise detail
        axios.get('http://localhost:5000/exercises/' + id)
          .then(res => {
            setUsername(res.data.username)
            setDescription(res.data.description)
            setDuration(res.data.duration)
            setDate(new Date(res.data.date))
          })
    // eslint-disable-next-line
    },[])

    const onChangeUsername = e => {
        setUsername(e.target.value)
    }

    const onChangeDescription = e => {
        setDescription(e.target.value)
    }

    const onChangeDuration = e => {
        setDuration(e.target.value)
    }
    
    const onChangeDate = date => {
        setDate(date)
    }

    const onSubmit = e => {
        e.preventDefault();

        const exercise = {
            username,
            description,
            duration,
            date
        }

        axios.post('http://localhost:5000/exercises/update/' + id, exercise)
            .then(res => console.log(res.data));

        window.location = "/";
    }

    return (
        <div>
          <h3>Edit Exercise Log</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group"> 
              <label>Username: </label>
              <select
                  required
                  className="form-control"
                  value={username}
                  onChange={onChangeUsername}>
                  {
                    users.map(function(user) {
                      return <option 
                        key={user}
                        value={user}>{user}
                        </option>;
                    })
                  }
              </select>
            </div>
            <div className="form-group"> 
              <label>Description: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={description}
                  onChange={onChangeDescription}
                  />
            </div>
            <div className="form-group">
              <label>Duration (in minutes): </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={duration}
                  onChange={onChangeDuration}
                  />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  selected={date}
                  onChange={onChangeDate}
                />
              </div>
            </div>
    
            <div className="form-group">
              <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
            </div>
          </form>
        </div>
    )
}

export default EditExercise