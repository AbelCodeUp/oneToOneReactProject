import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import ServerUrl from '../config/server';

export default class OrderLesson extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }
    componentDidMount() {
        console.log(axios());
    }

    render() {
        return (
            <div>
               person
            </div>
        )
    }
}
