import React, {Component} from "react";
import {auth} from "firebase";
import routePaths from "../../constKeys/routePaths";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {getAndDispatchDbUser} from "../../redux/actions/userActions";
import localKeys from "../../constKeys/localKeys";
import Header from "../Header/Header";
import QuestionPage from "../QuestionPage/QuestionPage";
import AskQuestionPage from "../AskQuestionPage/AskQuestionPage";
import AfterRegPopup from "../Profile/AfterRegPopup/AfterRegPopup";
import Profile from "../Profile/Profile";

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isStoreFull: !!props.dbUser
        };

        if (localStorage.getItem(localKeys.isUserLoggedIn) === "false") {
            props.history.push(routePaths.signIn);
        }
    }

    componentDidMount() {
        if (!this.state.isStoreFull) {
            auth().onAuthStateChanged(user => {
                if (user) {
                    this.props.getAndDispatchDbUser(user.uid);
                    localStorage.setItem(localKeys.isUserLoggedIn, "true");
                }
            })
        }
        this.setState({isStoreFull: true});
    }

    rend() {
        const {match} = this.props;

        if (this.state.isStoreFull) {
            switch (match.path) {
                case routePaths.questionPage:
                    return <QuestionPage/>;
                case routePaths.profilePage:
                    return <Profile/>;
                case routePaths.askQuestionPage:
                    return <AskQuestionPage/>;
                default:
            }
        }
    }

    render() {
        return (
            <div className="Main">
                <Header/>
                <div>
                    {this.rend()}
                    {localStorage.getItem(localKeys.isNewUser) === "true" && <AfterRegPopup/>}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        dbUser: state.userReducer.dbUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAndDispatchDbUser: bindActionCreators(getAndDispatchDbUser, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
