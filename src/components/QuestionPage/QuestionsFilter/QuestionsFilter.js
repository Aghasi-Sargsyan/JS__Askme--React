import React, { Component } from "react";
import './QuestionsFilter.scss';

class QuestionsFilter extends Component {

    render() {
        return (
            <div className='questions-filter-container '>
                <ul className='flex flex_column align_start'>
                    <li>
                        <button id={"all"} onClick={this.props.filterClickHandler}>
                            All
                        </button>
                    </li>
                    <li>
                        <button id={"age"} onClick={this.props.filterClickHandler}>
                            Age
                        </button>
                    </li>
                    <li>
                        <button id={"gender"} onClick={this.props.filterClickHandler}>
                            Gender
                        </button>
                    </li>
                    <li className='flex flex_column align_start'>
                        Skills
                        <ul className='flex wrap align_start questions-skills-menu'>
                            {this.props.skills.map((skill, index) =>
                                <li key={index}>
                                    <button onClick={this.props.filterClickHandler}
                                        id={skill.value}>
                                        {skill.value}
                                    </button>
                                </li>)}
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}
export default QuestionsFilter;
