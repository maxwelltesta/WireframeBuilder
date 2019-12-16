import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button } from 'react-materialize';
import Control from './Control'
import { Rnd } from "react-rnd"

class EditScreen extends React.Component {
    state = {
        name: (this.props.wireframe !== null && this.props.wireframe.name !== undefined) ? this.props.wireframe.name : "",
        width: (this.props.wireframe !== null && this.props.wireframe.width !== undefined) ? this.props.wireframe.width : "",
        height: (this.props.wireframe !== null && this.props.wireframe.height !== undefined) ? this.props.wireframe.height : "",
        controls: (this.props.wireframe !== null && this.props.wireframe.controls !== undefined) ? this.props.wireframe.controls : "",
        selected: '',
        zoom: 1
    }
    changedTime=false;

    updateTime = () => {
        let fireStore = getFirestore();
        fireStore.collection('wireframes').doc(this.props.wireframe.id).update({ time: Date.now() })
    }
    processZoomIn = () => {
        let newZoom = this.state.zoom;
        newZoom = newZoom * 2;
        this.setState(state => ({
            ...state,
            zoom: newZoom
        }))
    }
    processZoomOut = () => {
        let newZoom = this.state.zoom;
        newZoom = newZoom / 2;
        this.setState(state => ({
            ...state,
            zoom: newZoom
        }))
    }
    processSave = () => {
        getFirestore().collection('wireframes').doc(this.props.wireframe.id).update({
            name: this.state.name,
            width: this.state.width,
            height: this.state.height,
            controls: this.state.controls
        });
    }
    handleClose = () => {
        const history = this.props.history;
        history.push("/");
    }
    handleNameChange = (e) => {
        this.setState(state => ({
            ...state,
            name: this.refs.name.value
        }))
    }
    handleTextChange = (e) => {
        const { target } = e;
        const targetName = target.name;
        const selected = this.state.selected;
        const newControls = this.state.controls;
        newControls[selected.key].text = target.value;

        this.setState(state => ({
            ...state,
            controls: newControls
        }));
    }
    handleFontSizeChange = (e) => {
        const { target } = e;
        const targetName = target.name;
        const selected = this.state.selected;
        const newControls = this.state.controls;
        newControls[selected.key].font_size = target.value;

        this.setState(state => ({
            ...state,
            controls: newControls
        }));
    }
    handleFontColorChange = (e) => {
        const { target } = e;
        const targetName = target.name;
        const selected = this.state.selected;
        const newControls = this.state.controls;
        newControls[selected.key].text_color = target.value;

        this.setState(state => ({
            ...state,
            controls: newControls
        }));
    }
    handleBackgroundChange = (e) => {
        const { target } = e;
        const targetName = target.name;
        const selected = this.state.selected;
        const newControls = this.state.controls;
        newControls[selected.key].background_color = target.value;

        this.setState(state => ({
            ...state,
            controls: newControls
        }));
    }
    handleBorderColorChange = (e) => {
        const { target } = e;
        const targetName = target.name;
        const selected = this.state.selected;
        const newControls = this.state.controls;
        newControls[selected.key].border_color = target.value;

        this.setState(state => ({
            ...state,
            controls: newControls
        }));
    }
    handleBorderWidthChange = (e) => {
        const { target } = e;
        const targetName = target.name;
        const selected = this.state.selected;
        const newControls = this.state.controls;
        newControls[selected.key].border_thickness = target.value;

        this.setState(state => ({
            ...state,
            controls: newControls
        }));
    }
    handleBorderRadiusChange = (e) => {
        const { target } = e;
        const targetName = target.name;
        const selected = this.state.selected;
        const newControls = this.state.controls;
        newControls[selected.key].border_radius = target.value;

        this.setState(state => ({
            ...state,
            controls: newControls
        }));
    }
    changeDimensions = () => {
        if (this.refs.width.value < 1 || this.refs.width.value > 5000) {
            this.refs.width.value = 500;
        }
        if (this.refs.height.value < 1 || this.refs.height.value > 5000) {
            this.refs.height.value = 500;
        }
        this.setState(state => ({
            ...state,
            width: this.refs.width.value,
            height: this.refs.height.value
        }))
    }
    processAddContainer = () => {
        const newControls = this.state.controls;
        let newControl = {
            key: newControls.length,
            type: "container",
            text: null,
            selected: false,
            width: 300,
            height: 100,
            x_position: 0,
            y_position: 0,
            font_size: null,
            text_color: null,
            background_color: "ffffff",
            border_color: "000000",
            border_thickness: 1,
            border_radius: 5
        }
        newControls.push(newControl);
        this.setState(state => ({
            ...state,
            controls: newControls
        }))
    }
    processAddLabel = () => {
        const newControls = this.state.controls;
        let newControl = {
            key: newControls.length,
            type: "label",
            text: "Label",
            selected: false,
            width: 100,
            height: 50,
            x_position: 0,
            y_position: 0,
            font_size: 12,
            text_color: "#000000",
            background_color: "#ffffff",
            border_color: "#000000",
            border_thickness: 0,
            border_radius: 0
        }
        newControls.push(newControl);
        this.setState(state => ({
            ...state,
            controls: newControls
        }))
    }
    processAddButton = () => {
        const newControls = this.state.controls;
        let newControl = {
            key: newControls.length,
            type: "button",
            text: "Button",
            selected: false,
            width: 100,
            height: 30,
            x_position: 0,
            y_position: 0,
            font_size: 12,
            text_color: "#000000",
            background_color: "#d6d6d6",
            border_color: "#000000",
            border_thickness: 1,
            border_radius: 5
        }
        newControls.push(newControl);
        this.setState(state => ({
            ...state,
            controls: newControls
        }))
    }
    processAddTextfield = () => {
        const newControls = this.state.controls;
        let newControl = {
            key: newControls.length,
            type: "textfield",
            text: "Input",
            selected: false,
            width: 100,
            height: 30,
            x_position: 0,
            y_position: 0,
            font_size: 12,
            text_color: "#d6d6d6",
            background_color: "#ffffff",
            border_color: "#000000",
            border_thickness: 1,
            border_radius: 0
        }
        newControls.push(newControl);
        this.setState(state => ({
            ...state,
            controls: newControls
        }))
    }
    deselect = (e) => {
        e.preventDefault();
        this.setState(state => ({
            ...state,
            selected: null
        }))
        this.refs.text.value = ''
        this.refs.font_size.value = ''
        this.refs.text_color.value = ''
        this.refs.background_color.value = ''
        this.refs.border_color.value = ''
        this.refs.border_thickness.value = ''
        this.refs.border_radius.value = ''
    }
    handleSelection = (e, control) => {
        e.stopPropagation();
        this.setState(state => ({
            ...state,
            selected: control
        }))
        this.handleSelectionValues(control);
    }
    handleSelectionValues = (control) => {
        this.refs.text.value = control.text;
        this.refs.font_size.value = control.font_size;
        this.refs.text_color.value = control.text_color;
        this.refs.background_color.value = control.background_color;
        this.refs.border_color.value = control.border_color;
        this.refs.border_thickness.value = control.border_thickness;
        this.refs.border_radius.value = control.border_radius;
    }
    processDeleteControl = () => {
        if (!this.state.selected) {

        }
        else {
            const newControls = this.state.controls;
            newControls.splice(this.state.selected.key, 1)
            for (let i = 0; i < newControls.length; i++) {
                newControls[i].key = i;
            }
            this.setState(state => ({
                ...state,
                controls: newControls
            }))
            this.deselect.bind(this);
            }
        }
    processDuplicateControl = () => {
        if (!this.state.selected) {
        }
        else {
            const newControls = this.state.controls;
            const dupe = this.state.selected;
        let newControl = {
            key: newControls.length,
            type: dupe.type,
            text: dupe.text,
            selected: dupe.selected,
            width: dupe.width,
            height: dupe.height,
            x_position: dupe.x_position + 100,
            y_position: dupe.y_position + 100,
            font_size: dupe.font_size,
            text_color: dupe.text_color,
            background_color: dupe.background_color,
            border_color: dupe.border_color,
            border_thickness: dupe.border_thickness,
            border_radius: dupe.border_radius
        }
        newControls.push(newControl);
        this.setState(state => ({
            ...state,
            controls: newControls
        }))
        }
    }
    handleKeyPress = (e) => {
        if (e.ctrlKey) {
            if (e.keyCode === 68) {
                this.processDuplicateControl();
            }
            else if(e.keyCode === 8) {
                this.processDeleteControl();
            }
        }
    }
    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        window.addEventListener("keydown", this.handleKeyPress);
    }

    componentWillUnmount = () => {
        // DISPLAY WHERE WE ARE
        window.removeEventListener("keydown", this.handleKeyPress);
    }
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        else if (!this.props.wireframe) {
            return <React.Fragment/>
        }
        if (!this.changedTime) {
            this.changedTime = true;
            this.updateTime();
        }
        return(
            <div className="row" >
                <div className="col s3 control_picker row">
                    <div className="functions">
                        <div className="col s3">
                            <button className="zoom_button" onClick={this.processZoomIn}><i class="material-icons">zoom_in</i></button>
                        </div>
                        <div className="col s3">
                            <button className="zoom_button" onClick={this.processZoomOut}><i class="material-icons">zoom_out</i></button>
                        </div>
                        <div className="col s3">
                            <button className="zoom_button" onClick={this.processSave}>Save</button>
                        </div>
                        <div className="col s3">
                            <Modal header="Close wireframe?" trigger={<button className="zoom_button">Close</button>} actions={[<Button onClick={this.handleClose.bind(this)}>Yes</Button>, <Button modal="close">No</Button>]}>
                                <p>Are you sure you want to close the wireframe? All progress will be lost.</p>
                            </Modal>
                        </div>  
                    </div>
                    <br></br>
                    <div className="col s12 row">
                        <div className="col s12">
                            <div className="container_button" onClick={this.processAddContainer}></div>
                        </div>
                        <div className="container_label">Container</div>
                        <div className="col s12">
                            <div className="input_button" onClick={this.processAddLabel}>Prompt for input.</div>
                        </div>
                        <div className="container_label">Label</div>
                        <div className="col s12">
                            <div className="submit_label" onClick={this.processAddButton}>Submit</div>
                        </div>
                        <div className="container_label">Button</div>
                        <div className="col s12">
                            <div className="text_label" onClick={this.processAddTextfield}>Input</div>
                        </div>
                        <div className="container_label">Textfield</div>
                    </div>
                </div>
                <div className="col s6 control_picker row">
                    <div className="input-field col s5">
                        <input id="name" type="text" ref="name" className="active" onChange={this.handleNameChange} defaultValue={this.state.name}></input>
                        <label for="name">Name</label>
                     </div>
                     <div className="input-field col s2">
                        <input id="width" type="text" ref="width" className="active" defaultValue={this.state.width}></input>
                        <label for="width">Width</label>
                     </div>
                     <div className="input-field col s2">
                        <input id="height" type="text" ref="height" className="active" defaultValue={this.state.height}></input>
                        <label for="height">Height</label>
                     </div>
                     <div className="input-field col s3">
                        <button className="zoom_button" onClick={this.changeDimensions}>Change Dimensions</button>
                     </div>
                     <div style={{width: "100%", height: "100%", overflow: "scroll", position: "relative"}}>
                            <div className="wireframe_box" style={{height: this.state.height+"px", width: this.state.width+"px", transform:[{scale:this.state.zoom }]}} onClick={this.deselect.bind(this)}>
                                {this.state.controls && this.state.controls.map(control => (
                                        <Rnd
                                            onClick={(e) => {this.handleSelection(e, control)}}
                                            style={{
                                            position: "absolute",
                                            "font-size": control.font_size + "pt",
                                            color: control.text_color,
                                            "background-color": control.background_color,
                                            "border-style": "solid",
                                            "border-color": control.border_color,
                                            "border-width": control.border_thickness + "px",
                                            "border-radius": control.border_radius + "px",
                                            cursor: "pointer"}} 
                                            size={{width: control.width, height: control.height}}
                                            position={{x: control.x_position, y: control.y_position}} 
                                            enableResizing={this.state.selected == control ? {top:false, right:false, bottom:false, left:false, topRight:true, bottomRight:true, bottomLeft:true, topLeft:true} : {top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}} 
                                            disableDragging={this.state.selected == control ? false : true}
                                            onDragStop={(e,d) => {
                                                this.handleSelection(e, control)
                                                const selected = this.state.selected;
                                                const newControls = this.state.controls;
                                                newControls[selected.key].x_position = d.x;
                                                newControls[selected.key].y_position = d.y;
                                                this.setState(state => ({
                                                    ...state,
                                                    controls: newControls
                                                }))
                                            }}
                                            onResizeStop={(e, direction, ref, delta, position) => {
                                                this.handleSelection(e, control)
                                                const selected = this.state.selected;
                                                const newControls = this.state.controls;
                                                newControls[selected.key].width = ref.style.width;
                                                newControls[selected.key].height = ref.style.height;
                                                this.setState(state => ({
                                                    ...state,
                                                    controls: newControls
                                                }))
                                            }}>
                                            {control.text}
                                        </Rnd>
                                ))}
                            </div>
                     </div>
                </div>
                
                <div className="col s3 control_picker row">
                    <div>Properties</div>
                    <input type="text" name="text" ref="text" disabled={this.state.selected !== null ? false : true} onChange={this.handleTextChange.bind(this)} defaultValue={this.state.selected !== null ? this.state.selected.text : ''}></input>
                    <div className="row">
                        <div className="col s4">Font Size:</div>
                        <input type="number" name="text" ref="font_size" disabled={this.state.selected !== null ? false : true}  onChange={this.handleFontSizeChange.bind(this)} min="1" max="72" className="col s7" defaultValue={this.state.selected !== null ? this.state.selected.font_size : ''}></input>
                    </div>
                    <div class="divider"></div>
                    <div className="row">
                        <div className="col s4">Font Color:</div>
                        <input type="color" name="text_color" ref="text_color" disabled={this.state.selected !== null ? false : true}  onChange={this.handleFontColorChange.bind(this)} className="col s7" defaultValue={this.state.selected !== null ? this.state.selected.text_color : '#000000'}></input>
                    </div>
                    <div class="divider"></div>
                    <div className="row">
                        <div className="col s4">Background:</div>
                        <input type="color" name="background_color" ref="background_color" disabled={this.state.selected !== null ? false : true}  onChange={this.handleBackgroundChange.bind(this)} className="col s7" defaultValue={this.state.selected !== null ? this.state.selected.background_color : '#000000'}></input>
                    </div>
                    <div class="divider"></div>
                    <div className="row">
                        <div className="col s4">Border Color:</div>
                        <input type="color" name="border_color" ref="border_color" disabled={this.state.selected !== null ? false : true}  onChange={this.handleBorderColorChange.bind(this)} className="col s7" defaultValue={this.state.selected !== null ? this.state.selected.border_color : '#000000'}></input>
                    </div>
                    <div class="divider"></div>
                    <div className="row">
                        <div className="col s4">Border Width:</div>
                        <input type="number" name="border_thickness" ref="border_thickness" disabled={this.state.selected !== null ? false : true}  onChange={this.handleBorderWidthChange.bind(this)} min="0" max="20" className="col s7" defaultValue={this.state.selected !== null ? this.state.selected.border_thickness : ''}></input>
                    </div>
                    <div class="divider"></div>
                    <div className="row">
                        <div className="col s4">Border Radius:</div>
                        <input type="number" name="border_radius" ref="border_radius" disabled={this.state.selected !== null ? false : true}  onChange={this.handleBorderRadiusChange.bind(this)} min="0" max="15" className="col s7" defaultValue={this.state.selected !== null ? this.state.selected.border_radius : ''}></input>
                    </div>
                </div>
            </div>
        );        
    }
}

const mapStateToProps = (state, ownProps) => {
    const { wireframes } = state.firestore.data;
    const { id } = ownProps.match.params; 
    const wireframe = wireframes ? wireframes[id] : null;
    if(wireframe) {
        wireframe.id = id;
    }
    return {
        auth: state.firebase.auth,
        wireframe
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'wireframes' },
    ]),
)(EditScreen);