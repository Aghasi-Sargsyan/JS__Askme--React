import React, { Component } from 'react';
import QuestionItem from '../../universal/QuestionItem/QuestionItem';
import './QuestionsCont.scss';

export default class QuestionsCont extends Component {
    render() {
        return (
            <div className='am--questions-container'>
                <QuestionItem />
                <QuestionItem />
            </div>
        )
    }
}