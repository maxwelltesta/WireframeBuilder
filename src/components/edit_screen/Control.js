import React, { Component } from 'react';
import { getFirestore } from 'redux-firestore';

class Control extends React.Component {
    handleSelection = (e) => {
        e.stopPropagation();
        getFirestore().collection('wireframes').doc(this.props.wireframe.id).update({
            selected: this.props.control
        });
        this.handleSelectionValues();
    }
    handleSelectionValues = () => {
        this.props.refs.text.value = this.props.control.text;
        this.props.refs.font_size.value = this.props.control.font_size;
        this.props.refs.text_color.value = this.props.control.text_color;
        this.props.refs.background_color.value = this.props.control.background_color;
        this.props.refs.border_color.value = this.props.control.border_color;
        this.props.refs.border_thickness.value = this.props.control.border_thickness;
        this.props.refs.border_radius.value = this.props.control.border_radius;
    }

    render() {
        const control = this.props.control;
        const { wireframe } = this.props.wireframe;
        if (control.type == "container") {
            return <div onClick={this.handleSelection.bind(this)} style={{
                position: "absolute",
                width: control.width + "px",
                height: control.height + "px",
                left: control.x_position + "px",
                top: control.y_position + "px",
                "font-size": control.font_size + "pt",
                color: control.text_color,
                "background-color": control.background_color,
                "border-style": "solid",
                "border-color": control.border_color,
                "border-width": control.border_thickness + "px",
                "border-radius": control.border_radius + "px",
                cursor: "pointer"
            }}>{control.text}</div>;
        }
        else if (control.type == "label") {
            return <div onClick={this.handleSelection.bind(this)} style={{
                position: "absolute",
                width: control.width + "px",
                height: control.height + "px",
                left: control.x_position + "px",
                top: control.y_position + "px",
                "font-size": control.font_size + "pt",
                color: control.text_color,
                "background-color": control.background_color,
                "border-style": "solid",
                "border-color": control.border_color,
                "border-width": control.border_thickness + "px",
                "border-radius": control.border_radius + "px",
                cursor: "pointer"
            }}>{control.text}</div>;
        }
        else if (control.type == "button") {
            return <div onClick={this.handleSelection.bind(this)} style={{
                position: "absolute",
                width: control.width + "px",
                height: control.height + "px",
                left: control.x_position + "px",
                top: control.y_position + "px",
                "font-size": control.font_size + "pt",
                color: control.text_color,
                "background-color": control.background_color,
                "border-style": "solid",
                "border-color": control.border_color,
                "border-width": control.border_thickness + "px",
                "border-radius": control.border_radius + "px",
                cursor: "pointer"
            }}>{control.text}</div>;
        }
        else if (control.type == "textfield") {
            return <div onClick={this.handleSelection.bind(this)} style={{
                position: "absolute",
                width: control.width + "px",
                height: control.height + "px",
                left: control.x_position + "px",
                top: control.y_position + "px",
                "font-size": control.font_size + "pt",
                color: control.text_color,
                "background-color": control.background_color,
                "border-style": "solid",
                "border-color": control.border_color,
                "border-width": control.border_thickness + "px",
                "border-radius": control.border_radius + "px",
                cursor: "pointer"
            }}>{control.text}</div>;
        }
    }
}

export default Control;