import React, { Component } from "react";
import { connect } from "react-redux";

class Question extends Component {
    render() {

        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questionReducer.questions
    }
}
export default connect(mapStateToProps)(Question)
