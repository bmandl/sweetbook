import React, { useReducer } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { reducer, itemReducer } from './InputHandlers';

function FormGroupArray(props) {
    //for each parameter object which represents a FormGroup
    //array of FormGroups    
    return props.groups.map((obj, index) =>
        <React.Fragment key={"frag" + index}>
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
        </React.Fragment>
    )
}

const AddRecipe = () => {
    //controlled inputs
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
    const [ingredients, updateIngredients] = useReducer(itemReducer, []);
    const [steps, updateSteps] = useReducer(itemReducer, []);

    const handleChange = e => {
        dispatch({ field: e.target.name, value: e.target.value })
    }

    const addItem = ({ input, value }) => {
        //add list item with input field value  
        let action = { type: 'add', payload: <ListGroup.Item onClick={removeItem}>{value}</ListGroup.Item> };
        switch (input) {
            case 'ingredient':
                updateIngredients(action)
                break;
            case 'step':
                updateSteps(action)
                break;
        }
        //clear input field
        dispatch({ field: input, value: '' })
    }

    const removeItem = (e) => {
        //remove list item upon click on
        let action = { type: 'remove', payload: e.currentTarget.textContent };
        switch (e.target.parentNode.id) {
            case 'ingredientsList':
                updateIngredients(action)
                break
            case 'stepsList':
                updateSteps(action)
                break
        }

    }

    const { title, brief, ingredient, quantity, unit, step, type, main, occasion, method, diet, notes } = input;

    return (
        <Form>
            <FormGroupArray groups={
                [
                    {
                        id: "title",
                        label: "Title:",
                        control: { as: "input", type: "text", value: title, handleChange: handleChange }
                    },
                    {
                        id: "brief",
                        label: "Brief description:",
                        control: { as: "textarea", value: brief, handleChange: handleChange }
                    }
                ]}
            />

            <section className="hr">
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
                            control: { as: "select", value: unit, handleChange: handleChange },
                            button: {
                                name: "addIngredient", variant: "primary", text: "Add ingredient",
                                clickAction: () => addItem({ input: "ingredient", value: ingredient })
                            }
                        }
                    ]}
                />
                {ingredients &&
                    <ListGroup as="ul" id="ingredientsList">{ingredients}</ListGroup>
                }
            </section>

            <section className="hr">
                <h2>Preparation</h2>
                <Form.Group controlId="step">
                    <Form.Label>Step:</Form.Label>
                    <Form.Control as="input" type="text" name="step" value={step} onChange={handleChange} />
                </Form.Group>
                <Button name="addStep" variant="primary" onClick={() => addItem({ input: "step", value: step })}>Add step</Button>
                {steps &&
                    <ListGroup as="ul" id="stepsList">{steps}</ListGroup>
                }
            </section>

            <section className="hr">
                <h2>Details</h2>
                <FormGroupArray groups={
                    [
                        {
                            id: "type",
                            label: "Type:",
                            control: { as: "input", type: "text", value: type, handleChange: handleChange }
                        },
                        {
                            id: "main",
                            label: "Main ingredient(s):",
                            control: { as: "input", type: "text", value: main, handleChange: handleChange }
                        },
                        {
                            id: "occasion",
                            label: "Season/Ocasion:",
                            control: { as: "input", type: "text", value: occasion, handleChange: handleChange }
                        },
                        {
                            id: "method",
                            label: "Preparation method:",
                            control: { as: "input", type: "text", value: method, handleChange: handleChange }
                        },
                        {
                            id: "diet",
                            label: "Dietary consideration:",
                            control: { as: "input", type: "text", value: diet, handleChange: handleChange }
                        }
                    ]}
                />
            </section>

            <section className="hr">
                <h2>Notes</h2>
                <Form.Group controlId="notes">
                    <Form.Control as="textarea" value={notes} onChange={handleChange} />
                </Form.Group>
            </section>
        </Form>
    )
}

export default AddRecipe;