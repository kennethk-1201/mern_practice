import {useState, useEffect} from "react"
import axios from "axios";
import { Link } from "react-router-dom";

const Exercise = props => {

    const {username, description, duration, date, _id} = props.exercise

    return(
        <tr>
            <td>{username}</td>
            <td>{description}</td>
            <td>{duration}</td>
            <td>{date.substring(0,10)}</td>
            <td>
                <Link to={"/edit/"+_id}>edit</Link> | <a href="/" onClick={() => {props.deleteExercise(_id) }}>delete</a>
            </td>
        </tr>
    )
}

const ExercisesList = props => {
    
    const [exercises, setExercises] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:5000/exercises/')
            .then(res => {
                setExercises(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const deleteExercise = id => {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data));
        setExercises(
            exercises.filter(el => el._id !== id)
        )
    }

    const exerciseList = () => {
        return exercises.map(e => {
            return <Exercise exercise = {e} deleteExercise = {deleteExercise} key = {e._id}/>;
        })
    }

    return(
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
            <thead className="thead-light">
                <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { exerciseList() }
            </tbody>
            </table>
        </div>
    )
}

export default ExercisesList