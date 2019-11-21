import React, {Component} from 'react';
import './tasks.css'
import {connect} from 'react-redux';
import TasksActions from '../../../store/actions/tasksActions'
import Task from '../task/task'

class Tasks extends Component{

    componentDidMount(){
        this.props.getTasks();
    }
    
    render(){
        return(
            <div className="tasks container">
                <div className="row">
                {(this.props.tasks.length > 0) ? this.renderTasks() : null} 
                </div>
            </div>
        );
    }

    renderTasks(){
        console.log(this.props.tasks);
        return this.props.tasks.map((task, i) => {
            return(
                <Task key={task.id} description={task.description} category={task.category} date={task.date} priority={task.priority} tags={task.tags} />
            );
        });
    }

}

function mapDispatchToProps(dispatch){
    return {
        getTasks: () => dispatch(TasksActions.loadTasks())
    }
}

function mapStateToProps(state){
    return {
        tasks: state.tasks.tasks
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);