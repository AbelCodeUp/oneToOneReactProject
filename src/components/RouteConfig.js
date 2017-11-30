require('normalize.css/normalize.css');
require('styles/flexible.debug.css');
require('styles/flexible.debug.js');
require('styles/App.css');
require('styles/Lesson.css');
require('styles/smy_course.css');

import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  IndexRoute,
  Route,
  Redirect,
  hashHistory,
  IndexRedirect
} from 'react-router';

import IndexMain from './IndexMain';
import Main from './Main';
import OrderLesson from './OrderLesson';
import LessonMainIndex from './LessonMainIndex';

import ALlTeachers from './AllTeachers';
import LessonMain from './LessonMain';
import Attention from './Attention';

import TeacherInfo from './TeacherInfo';

// xjr
import Person from './Person';
import PersonInfo from './PersonInfo';
import MyClass from './MyClass';
import MyDingdan from './MyDingdan';
// zjb
import PingJia from './PingJia';
import LessonList from './LessonList';
import UnFinish from './UnFinish';
import Finished from './Finished1';

export default class AppComponent extends React.Component {
  render() {
    return (
        <Router history={hashHistory}>
          <Route path="/" component={IndexMain}>
          {/* 权浏览权限判断 */}
          {/* <IndexRoute component={Main} onEnter={({params}, replace) => replace('/Login')} /> */}
          {/* <Route path="Main" onEnter={({params}, replace) => replace('/Login')} component={Main} />

                      <Route path="Login" component={Login} /> */
          }
            <Route path="orderLesson" component={LessonMain}>
              <IndexRedirect from="/orderLesson" to="/orderLesson/teachers"/>
              <Route path="teachers" component={ALlTeachers}/>
              <Route path="attention" component={Attention}/>
            </Route>
            {/* zjb */}
            {/* <IndexRedirect to="/lessonlist/unfinish" /> */}
            <Route path="lessonlist" component={LessonList}>
              <IndexRoute component={UnFinish}/>
              <Route path="unfinish" component={UnFinish}/>
              <Route path="finished" component={Finished}/>
            </Route>
            <Route path="person" component={Person}/>{/* xjr */}

            <Route path="/Main" component={TeacherInfo}/> {/* xjr */}
            <Route path="/teacherInfo/:id" component={TeacherInfo}/>
          </Route>
          <Route path="/personinfo" component={PersonInfo}></Route>
          <Route path="/myclass" component={MyClass}></Route>
          <Route path="/mydingdan" component={MyDingdan}></Route>
          {/* zjb */}
          <Route path="/pingjia" component={PingJia}/>

        </Router>
    )
  }
}
