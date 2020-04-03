import React from 'react';
import { Form, Button } from 'react-bootstrap';

function createFormGroupArray() {
    //create array from function parameters
    let groupParameters = Array.from(arguments);
    let groupArray = [];
    //for each parameter object which represents a FormGroup
    groupParameters.forEach(obj => {
        groupArray.push(
            <>
                <Form.Group controlId={obj.id}>
                    <Form.Label>{obj.label}</Form.Label>
                    <Form.Control as={obj.control.as} type={obj.control.type} />
                </Form.Group>
                {obj.button &&  //Button is optional
                    <Button name={obj.button.name} variant={obj.button.variant}>
                        {obj.button.text}
                    </Button>
                }
            </>
        )
    })
    //array of FormGroups
    return groupArray;
}

const AddRecipe = () => {
    return (
        <>
            {createFormGroupArray(
                {
                    id: "title",
                    label: "Title:",
                    control: { as: "input", type: "text" }
                },
                {
                    id: "brief",
                    label: "Brief description:",
                    control: { as: "textarea" }
                })}

            <section class="hr">
                <h2>Ingredients</h2>
                {createFormGroupArray(
                    {
                        id: "name",
                        label: "Name:",
                        control: { as: "input", type: "text" }
                    },
                    {
                        id: "quantity",
                        label: "Quantity:",
                        control: { as: "input", type: "text" }
                    },
                    {
                        id: "unit",
                        label: "Unit:",
                        control: { as: "select" },
                        button: { name: "addIngredient", variant: "primary", text: "Add ingredient" }
                    }
                )}
            </section>

            <section class="hr">
                <h2>Preparation</h2>                
                <Form.Group controlId="step">
                    <Form.Label>Step:</Form.Label>
                    <Form.Control as="input" type="text" />                    
                </Form.Group>
                <Button name="addStep" variant="primary">Add step</Button>
            </section>

            <section class="hr">
                <h2>Details</h2>
                {createFormGroupArray(
                    {
                        id: "type",
                        label: "Type:",
                        control: { as: "input", type: "text" }
                    },
                    {
                        id: "main",
                        label: "Main ingredient(s):",
                        control: { as: "input", type: "text" }
                    },
                    {
                        id: "occasion",
                        label: "Season/Ocasion:",
                        control: { as: "input", type: "text" }
                    },
                    {
                        id: "method",
                        label: "Preparation method:",
                        control: { as: "input", type: "text" }
                    },
                    {
                        id: "diet",
                        label: "Dietary consideration:",
                        control: { as: "input", type: "text" }
                    }
                )}
            </section>

            <section class="hr">
                <h2>Notes</h2>
                <Form.Group>
                    <Form.Label for="notes"></Form.Label>
                    <Form.Control as="textarea" id="notes" name="notes"></Form.Control>
                </Form.Group>
            </section>
        </>
    )
}

export default AddRecipe;