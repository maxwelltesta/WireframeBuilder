import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button } from 'react-materialize';

class EditScreen extends Component {
    state = {
        name: "",
        height: null,
        width: null
    }
    handleClose = () => {
        const history = this.props.history;
    }
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        return(
            <div className="row">
                <div className="col s3 control_picker row">
                    <div className="functions">
                        <div className="col s3">
                            <button className="zoom_button"><i class="material-icons">zoom_in</i></button>
                        </div>
                        <div className="col s3">
                            <button className="zoom_button"><i class="material-icons">zoom_out</i></button>
                        </div>
                        <div className="col s3">
                            <button className="zoom_button">Save</button>
                        </div>
                        <div className="col s3">
                            <Modal header="Delete List?" trigger={<button className="zoom_button">Close</button>} actions={[<Button onClick={this.handleClose.bind(this)}>Yes</Button>, <Button modal="close">No</Button>]}>
                                <p>Are you sure you want to close the wireframe? All progress will be lost.</p>
                            </Modal>
                        </div>  
                    </div>
                    <br></br>
                    <div className="col s12 row">
                        <div className="col s12">
                            <div className="container_button"></div>
                        </div>
                        <div className="container_label">Container</div>
                        <div className="col s12">
                            <div className="input_button">Prompt for input.</div>
                        </div>
                        <div className="container_label">Label</div>
                        <div className="col s12">
                            <div className="submit_label">Submit</div>
                        </div>
                        <div className="container_label">Button</div>
                        <div className="col s12">
                            <div className="text_label">Input</div>
                        </div>
                        <div className="container_label">Textfield</div>
                    </div>
                </div>
                <div className="col s6 control_picker row">
                    <div class="input-field col s5">
                        <input id="name" type="text" class="validate"></input>
                        <label for="name">Name</label>
                     </div>
                     <div class="input-field col s2">
                        <input id="height" type="text" class="validate"></input>
                        <label for="height">Height</label>
                     </div>
                     <div class="input-field col s2">
                        <input id="width" type="text" class="validate"></input>
                        <label for="width">Width</label>
                     </div>
                     <div class="input-field col s3">
                        <button className="zoom_button">Submit</button>
                     </div>
                </div>
                <div className="col s3 control_picker row">
                    <div>Properties</div>
                    <input type="text" name="text"></input>
                    <div className="row">
                        <div className="col s4">Font Size:</div>
                        <input type="text" name="text" className="col s7"></input>
                    </div>
                    <div class="divider"></div>
                    <div className="row">
                        <div className="col s4">Font Color:</div>
                    </div>
                    <div class="divider"></div>
                    <div className="row">
                        <div className="col s4">Background:</div>
                    </div>
                    <div class="divider"></div>
                    <div className="row">
                        <div className="col s4">Border Color:</div>
                    </div>
                    <div class="divider"></div>
                    <div className="row">
                        <div className="col s4">Border Thickness:</div>
                        <input type="text" name="text" className="col s7"></input>
                    </div>
                    <div class="divider"></div>
                    <div className="row">
                        <div className="col s4">Border Radius:</div>
                        <input type="text" name="text" className="col s7"></input>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'wireframes' },
    ]),
)(EditScreen);