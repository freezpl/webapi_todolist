import React, { Component } from 'react';
import './task.css'

class Task extends Component {

    render() {
        return (
            <div className="col-sm-4 task-item">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">{this.props.description}</div>
                        <h6 className="card-subtitle mb-2 text-muted">{this.props.category.name}</h6>
                        <div className="priority">
                            <p>Priority:</p>
                            <progress value={this.props.priority} max="5"></progress>
                        </div>
                        <div className="task-tags">
                            {this.props.tags.map((t) => {
                                return (
                                    <span key={t.id}
                                        className="badge badge-primary" style={{backgroundColor: t.color} }
                                    >{t.name}</span>
                                );
                            })}
                        </div>
                        <div className="task-date">
                            <p>Date: <span>{this.props.date} </span></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Task;