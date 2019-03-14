import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from "connected-react-router";
import * as SpotifyOperations from '../state/ducks/spotify/operations'
import projects from '../config/projects'

import Modal from './common/modal';
import Button from './common/button';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
  play: SpotifyOperations.play,
  pause: SpotifyOperations.pause,
  setText: SpotifyOperations.setText,
  goToUrl: url => {
    return push(url)
  }
}, dispatch);

class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialog: true,
      projectId: 0
    };

    this.project = {};
  }

  componentWillMount() {
    this.props.play("spotify:track:79RUMZfMNMpqZnswovvTqv", true);
    this.props.setText("Take a look at some of my projects");
  }

  componentWillUnmount() {
    this.props.pause();
  }

  render() {
    if(this.state.projectId !== 0) {
      projects.find(section => {
        const prj = section.projects.find(project => project.id === this.state.projectId);
        if(prj) {
          this.project = prj;
        }
        return prj;
      })
    }
    return (
      <div className="mainContainer">
        <Modal open={this.state.dialog} onClose={() => this.setState({dialog: false})}>
          <div id="projectsInitDialog">
            <div id="title">Are you wondering...?</div>
            Ok, fine, but... <span style={{textDecoration: 'line-through'}}>WTF</span> <span className="highlight-color">What did you really do</span> besides some <span className="highlight-color">hackathons</span>??
            <Button id="findOut" onClick={() => this.setState({dialog: false})}>Let's find out!</Button>
          </div>
        </Modal>

        <Modal open={this.state.projectId !== 0} onClose={() => this.setState({projectId: 0})}>
          <div id="projectDialog">
            <img className="projectDialogImage"
              src={this.project.image}
              alt={"img_" + this.project.title}
            />
            <div className="projectDialogContent">
              <div className="projectDialogTitle">{this.project.title}</div>
              <div className="projectDialogDescription">
                {this.project.description ? this.project.description.split('\n').map(i => <p>{i}</p>) : ""}
              </div>
            </div>
            <Button id="close" onClick={() => this.setState({projectId: 0})}>Close</Button>
          </div>
        </Modal>

        <div id="projects">
          {projects.map(prj => (
            <div className="section" key={prj.section}>
              <div className="title">{prj.section}</div>
              <div className="frame">
                {prj.projects.map(project => (
                  <div key={project.id} className="prjImageFrame">
                    <img
                      className="prjImage"
                      src={project.image}
                      alt={"img_" + project.title}
                    />
                    <div className="prjTitle">{project.title}</div>
                    <div className="prjOverlay" onClick={() => this.setState({projectId: project.id})}>
                      <div className="infoBtn">Read more</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
