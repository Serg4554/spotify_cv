import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';

class MusicalLanguages extends React.Component {
  constructor(props) {
    super(props);

    this.langs = ['JavaScript', 'C/C++', 'Qt', 'MySQL', 'Java', 'C#', 'SQLite',
      'Loopback', 'React', 'MongoDB', 'Node.js', 'UML', 'PHP', 'HTML + CSS',
      'MVP', 'Express.js', 'Redux', 'Haskell', 'MVC', 'REST APIs'];

    let langsPlaying = [];
    this.langs.forEach((lang) => {
      langsPlaying.push({content: lang, left: 0, top: 0});
    });

    this.state = {
      langsPlaying,
      langsCaptured: [],
      finished: false,
      width: window.innerWidth,
      isMobile: window.innerWidth < 1040,
    };
  }

  componentWillMount() {
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth.bind(this));
  }

  updateWidth() {
    this.setState({
      width: window.innerWidth,
      isMobile: window.innerWidth < 1040,
    });
    this.updateLangsPosition();
  }

  updateLangsPosition() {
    this.langs.forEach((langName, i) => {

      let langsPlaying = this.state.langsPlaying;
      let lang = langsPlaying.find(lang => lang.content === langName);
      if (lang) {
        if (this.state.isMobile) {
          console.log('a');
          const width = this.state.width;
          lang.left = (i * width * .33 + 1) % (width * .66);
          const height = parseInt(i / 2);
          lang.top = (height * width * .104) % (width * .104 * 10);
        } else {
          lang.left = (i * 200) % 800;
          const height = parseInt(i / 4);
          lang.top = (height * 116) % 580;
        }
        this.setState({langsPlaying});
      }
    });
  }

  renderArena() {
    if (!this.state.finished) {
      return (
        <div className={style.langArena}>
          {this.state.langsPlaying.map(lang => (
            <div
              id={lang.content}
              key={lang.content}
              className={style.langElement}
              style={{
                left: lang.left + 'px',
                top: lang.top + 'px',
              }}
              onClick={() => {
                let langsPlaying = this.state.langsPlaying;
                let langsCaptured = this.state.langsCaptured;

                const index = langsPlaying.findIndex(l => l.content === lang.content);
                if (index !== -1) {
                  langsPlaying.splice(index, 1);
                }
                langsCaptured.push(lang);
                this.setState({langsPlaying, langsCaptured});

                if (langsPlaying.length === 0) {
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
          {this.state.langsCaptured.map(lang => (
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