import React from 'react'
import { connect } from 'react-redux';
import wireframeJson from './TestWireframeData.json'
import { getFirestore } from 'redux-firestore';
import { firestore } from 'firebase';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('wireframes').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('wireframes').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        wireframeJson.wireframes.forEach(wf => {
            fireStore.collection('wireframes').add({
                    key: wf.key,
                    authorID: wf.authorID,
                    name: wf.name,
                    height: wf.height,
                    width: wf.width,
                    selected: wf.selected,
                    controls: wf.controls,
                    time: Date.now()
                }).then(() => {
                    console.log("DATABASE RESET");
                }).catch((err) => {
                    console.log(err);
                });
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);