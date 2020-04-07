import React from 'react';
import { Form, Button } from 'react-bootstrap'

export default function FormGroupArray(props) {
    let errors = props.errors; //errors object from react-hook-forms
    
    //each object in props.groups represents a FormGroup    
    return props.groups.map((obj, index) => {
        let name = obj.id;
        return (
            <React.Fragment key={"frag" + index}>
                <Form.Group controlId={obj.id}>
                    <Form.Label>{obj.label}</Form.Label>
                    <Form.Control
                        {...obj.control} //spreading control object (assigning props to Form.Control element)
                        name={obj.id} //we need name attribute for validating form with react-hook-forms
                    />
                    <Form.Control.Feedback type="invalid"> 
                    {/*if there is an error in errors object, check if it's for current form control (errors[name], etc. errors.ingredients),
                    go through message object and find appropriate message text to output - look at addRecipe.js file, where FormGroupArray element is called!*/}
                        {errors && errors[name] && obj.message.reduce((_error, msg) => {
                            if (msg.type === errors[name].type) return msg.text; return _error;
                        }, '')
                        }
                    </Form.Control.Feedback>
                </Form.Group>
                {obj.button &&  //Button is optional
                    <Button {...obj.button}>
                        {obj.button.text}
                    </Button>
                }
            </React.Fragment>
        )
    }
    )
}