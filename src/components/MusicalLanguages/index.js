import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';

class MusicalLanguages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      langPlaying: [],
      langCaptured: [],
      finished: false,
    };
  }

  componentWillMount() {
    const langs = ['JavaScript', 'C/C++', 'Qt', 'MySQL', 'Java', 'C#', 'SQLite',
      'Loopback', 'React', 'MongoDB', 'Node.js', 'UML', 'PHP', 'HTML + CSS',
      'MVP', 'Express.js', 'Redux', 'Haskell', 'MVC', 'REST APIs'];

    let langPlaying = [];
    langs.forEach((lang, i) => {
      const left = (i * 200) % 800;
      const height = parseInt(i / 4);
      const top = (height * 116) % 580;

      langPlaying.push({content: lang, left, top});
    });
    this.setState({langPlaying});
  }

  renderArena() {
    if (!this.state.finished) {
      return (
        <div className={style.langArena}>
          {this.state.langPlaying.map(lang => (
            <div
              id={lang.content}
              key={lang.content}
              className={style.langElement}
              style={{
                left: lang.left + 'px',
                top: lang.top + 'px',
              }}
              onClick={() => {
                let langPlaying = this.state.langPlaying;
                let langCaptured = this.state.langCaptured;

                const index = langPlaying.findIndex(l => l.content === lang.content);
                if (index !== -1) {
                  langPlaying.splice(index, 1);
                }
                langCaptured.push(lang);
                this.setState({langPlaying, langCaptured});

                if (langPlaying.length === 0) {
                  this.setState({finished: true});
                  if (this.props.onFinished) {
                    this.props.onFinished();
                  }
                }

              }}
            >
              {lang.content}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className={style.langArena}>
          <span className={style.memeTxt}>Don't you feel like that?</span>
          <img
            className={style.memeImg}
            src="/images/idk.png"
            alt="I don't know what I'm doing"
          />
          <span className={style.memeTxt} role="img" aria-label="XD">😜</span>
        </div>
      );
    }
  }

  render() {
    return (
      <div className={style.frame}>
        <div className={style.langList}>
          {this.state.langCaptured.map(lang => (
            <div key={lang.content} className={style.langElement}>{lang.content}</div>
          ))}
        </div>
        {this.renderArena()}
      </div>
    );
  }
}

MusicalLanguages.propTypes = {
  onFinished: PropTypes.func,
};

export default MusicalLanguages;