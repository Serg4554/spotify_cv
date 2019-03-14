import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';

const HangmanFigure = (props) => {
  const {level, ...other} = props;

  return (
    <div className={style.figure} {...other}>
      <div className={style.poleTop}/>
      <div className={style.pole}/>
      <div className={style.poleBase}/>
      <div
        className={[style.figure, style.string].join(' ')}
        style={{opacity: level < 1 ? '0' : '1'}}
      />
      <div
        className={[style.figure, style.head].join(' ')}
        style={{opacity: level < 1 ? '0' : '1'}}
      />
      <div
        className={[style.figure, style.body].join(' ')}
        style={{opacity: level < 2 ? '0' : '1'}}
      />
      <div
        className={[style.figure, style.leftArm].join(' ')}
        style={{opacity: level < 3 ? '0' : '1'}}
      />
      <div
        className={[style.figure, style.rightArm].join(' ')}
        style={{opacity: level < 4 ? '0' : '1'}}
      />
      <div
        className={[style.figure, style.leftLeg].join(' ')}
        style={{opacity: level < 5 ? '0' : '1'}}
      />
      <div
        className={[style.figure, style.rightLeg].join(' ')}
        style={{opacity: level < 6 ? '0' : '1'}}
      />
    </div>
  );
};

HangmanFigure.propTypes = {
  level: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]).isRequired,
};

HangmanFigure.defaultProps = {
  level: 0,
};

export default HangmanFigure;