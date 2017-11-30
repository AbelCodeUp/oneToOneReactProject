require('normalize.css/normalize.css');
require('styles/flexible.debug.css');
require('styles/flexible.debug.js');
require('styles/App.css');
require('styles/Lesson.css');
require('styles/smy_course.css');

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, Redirect, hashHistory } from 'react-router';

import IndexMain from './IndexMain';
import Main from './Main';
import OrderLesson from './OrderLesson';
import LessonList from './LessonList';
import Person from './Person';
import LessonMainIndex from './LessonMainIndex';

import ALlTeachers  from './AllTeachers';
import LessonMain from './LessonMain';
import FinishList from './FinishList';
import Attention from './Attention';


export default class AppComponent extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={IndexMain}>
                    {/* 权浏览权限判断 */}
                    {/* <IndexRoute component={Main} onEnter={({params}, replace) => replace('/Login')} /> */}
                    {/* <Route path="Main" onEnter={({params}, replace) => replace('/Login')} component={Main} />

                    <Route path="Login" component={Login} /> */}
                    <IndexRoute component={LessonMainIndex} />
                    <Route path="orderLesson" component={LessonMain}>
                        <IndexRoute component={ALlTeachers} />
                        <Route path="teachers" component={ALlTeachers} />
                        <Route path="attention" component={Attention} />
                    </Route>
                    <Route path="lessonlist" component={FinishList} />
                    <Route path="person" component={Person} />
                </Route>
                <Route path="/Main" component={IndexMain}>

                </Route>
            </Router>
        )
    }
}
