import React, {PropTypes} from 'react';
import LessonMain from './LessonMain';
import ALlTeachers from './AllTeachers';

export default class LessonMainIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LessonMain>
        <ALlTeachers />
      </LessonMain>
    );
  }
}
LessonMainIndex.propTypes = {
};
