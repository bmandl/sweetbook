import React, { useState, useReducer } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { useInputChange, reducer } from './InputHandlers';

function FormGroupArray(props) {
    //for each parameter object which represents a FormGroup
    //array of FormGroups    
    return props.groups.map(obj =>
        <>
            <Form.Group controlId={obj.id}>
                <Form.Label>{obj.label}</Form.Label>
                <Form.Control
                    as={obj.control.as}
                    type={obj.control.type}
                    value={obj.control.value}
                    onChange={obj.control.handleChange}
                    name={obj.id}
                />
            </Form.Group>
            {obj.button &&  //Button is optional
                <Button name={obj.button.name} variant={obj.button.variant} onClick={obj.button.clickAction}>
                    {obj.button.text}
                </Button>
            }
        </>
    )
}

const AddRecipe = () => {
    //controlled input
    const initialState = {
        title: '',
        brief: '',
        ingredient: '',
        quantity: '',
        unit: '',
        step: '',
        type: '',
        main: '',
        occasion: '',
        method: '',
        diet: '',
        notes: ''
    };

    const [input, dispatch] = useReducer(reducer, initialState);
    const [ingredients, addIngredient] = useState([]);

    const handleChange = e => {
        dispatch({ field: e.target.name, value: e.target.value })
    }

    const { title, brief, ingredient, quantity, unit, step, type, main, occasion, method, diet, notes } = input;

    return (
        <>
            <FormGroupArray groups={
                [
                    {
                        id: "title",
                        label: "Title:",
                        control: { as: "input", type: "text" }
                    },
                    {
                        id: "brief",
                        label: "Brief description:",
                        control: { as: "textarea" }
                    }
                ]}
            />

            <section class="hr">
                <h2>Ingredients</h2>
                <FormGroupArray groups={
                    [
                        {
                            id: "ingredient",
                            label: "Ingredient:",
                            control: { as: "input", type: "text", value: ingredient, handleChange: handleChange }
                        },
                        {
                            id: "quantity",
                            label: "Quantity:",
                            control: { as: "input", type: "text", value: quantity, handleChange: handleChange }
                        },
                        {
                            id: "unit",
                            label: "Unit:",
                            control: { as: "select" },
                            button: {
                                name: "addIngredient", variant: "primary", text: "Add ingredient",
                                clickAction: () => addIngredient([...ingredients,
                                <ListGroup.Item>- {quantity} {unit} {ingredient}</ListGroup.Item>])
                            }
                        }
                    ]}
                />
                {ingredients &&
                    <ListGroup as="ul">{ingredients}</ListGroup>
                }
            </section>

            <section class="hr">
                <h2>Preparation</h2>
                <Form.Group controlId="step">
                    <Form.Label>Step:</Form.Label>
                    <Form.Control as="input" type="text" name="step" onChange={handleChange} />
                </Form.Group>
                <Button name="addStep" variant="primary">Add step</Button>
            </section>

            <section class="hr">
                <h2>Details</h2>
                <FormGroupArray groups={
                    [
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
                    ]}
                />
            </section>

            <section class="hr">
                <h2>Notes</h2>
                <Form.Group>
                    <Form.Label for="notes"></Form.Label>
                    <Form.Control as="textarea" id="notes" name="notes" onChange={handleChange} />
                </Form.Group>
            </section>
        </>
    )
}

export default AddRecipe;