import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireframeListLinks from './WireframeListLinks'
import { getFirestore } from 'redux-firestore';


class HomeScreen extends React.Component {
    handleNewWireframe = () => {
        const history = this.props.history;
        const ID = this.props.auth.uid;
        const firestore = getFirestore();
        firestore.collection('wireframes').add({
            name: '',
            height: 500,
            width: 500,
            authorID: ID,
            selected: null,
            controls: [],
            time: Date.now()
        }).then(function(doc) { 
            history.push("wireframe/" + doc.id)
        });
    }

    render() { 
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s6">
                        <WireframeListLinks />
                    </div>

                    <div className="col s6">
                        <div className="homebanner">
                            Wireframer
                        </div>
                        <div className="button_container">
                            <button className="home_new_list_button" onClick={this.handleNewWireframe}>
                                Create New Wireframe
                            </button>
                        </div>
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
      { collection: 'wireframes', orderBy: ["time", "desc"] },
    ]),
)(HomeScreen);