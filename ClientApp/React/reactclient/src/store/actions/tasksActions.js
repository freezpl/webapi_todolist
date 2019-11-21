import axios from '../../global/axios'
import {FETCH_TASKS} from './actionTypes'
export default class TasksActions {

    static loadTasks(){
        return (dispatch) => {
            axios.get('/tasks', ).then((res)=> {
                dispatch(this.fetchData(res.data))
            }).catch((e)=>{
                console.error(e);
            });
        }
    }

    static fetchData(tasks){
        return {type: FETCH_TASKS, value:tasks}
    }
}