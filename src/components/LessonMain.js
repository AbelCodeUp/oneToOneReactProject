import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import ServerUrl from '../config/server';

export default class LessonMain extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div className="bxk_header">
                    <ul>
                        <li className="bxk_lesson_nav_item">
                            <Link to="/" activeClassName="active" onlyActiveOnIndex={true} >全部外教 </Link>
                        </li>
                        <li className="bxk_lesson_nav_item">
                            <Link to="/orderLesson/attention" activeClassName="active" href="javascrit:;">我的关注</Link>
                        </li>
                    </ul>
                </div>
                <div className="bxk_content">
                    {
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}
