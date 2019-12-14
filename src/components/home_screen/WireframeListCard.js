import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button } from 'react-materialize';

class WireframeListCard extends Component {
    state = {
        modal: false,
    }
    handleDeleteItem = (e) => {
        e.preventDefault();
        const id = this.props.wireframe.id;
        getFirestore().collection('wireframes').doc(id).delete();
        this.handleModal();
    }
    handleCancelDelete = (e) => {
        e.preventDefault();
        this.handleModal();
    }
    handleModal = () => {
        this.setState({
            modal: false
        })
    }
    render() {
        const { wireframe } = this.props;
        console.log("WireframeListCard:" + wireframe.id);
        return (
            <div className="card z-depth-0 wire-card">
                <div className="card-content grey-text text-darken-3 row">
                    <span className="card-title truncate col s8 valign-wrapper">{wireframe.name}</span>
                    <Modal open={this.state.modal} header="Delete List?" trigger={<a class="btn-floating white right waves-effect waves-light"><i class="material-icons grey darken-3">clear</i></a>} actions={[<Button onClick={this.handleDeleteItem.bind(this)}>Yes</Button>, <Button onClick={this.handleCancelDelete.bind(this)}>No</Button>]}>
                        <p>Are you sure you want to delete the wireframe? The wireframe will not be retreivable.</p>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default compose(
    firestoreConnect([
      { collection: 'wireframes' },
    ]),
  )(WireframeListCard);