import React, { useReducer } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { reducer, itemReducer } from './InputHandlers';
import { useForm } from 'react-hook-form'

function FormGroupArray(props) {
    let errors = props.errors;
    //for each parameter object which represents a FormGroup
    //array of FormGroups    
    return props.groups.map((obj, index) => {
        let name = obj.id;
        return (
            <React.Fragment key={"frag" + index}>
                <Form.Group controlId={obj.id}>
                    <Form.Label>{obj.label}</Form.Label>
                    <Form.Control
                        {...obj.control}
                        name={obj.id}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors && errors[name] && obj.message.reduce((_error, msg) => {
                            if (msg.type === errors[name].type) return msg.text; return _error;
                        }, '')
                        }
                    </Form.Control.Feedback>
                </Form.Group>
                {obj.button &&  //Button is optional
                    <Button type="submit" name={obj.button.name} variant={obj.button.variant}>
                        {obj.button.text}
                    </Button>
                }
            </React.Fragment>
        )
    }
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

    const addItem = (fields, key) => {
        //add list item with input field value   
        let keys = [];
        let values = [];
        for (const field in fields) {
            keys.push(field);
            values.push(fields[field]);
        }
        let action = { type: 'add', payload: <ListGroup.Item key={key} onClick={removeItem}>{values.join(' ')}</ListGroup.Item> };
        switch (keys[0]) {
            case 'ingredient':
                updateIngredients(action)
                break;
            case 'step':
                updateSteps(action)
                break;
            default:
                break;
        }
        //clear input field
        keys.forEach(key => dispatch({ field: key, value: '' }))
    }

    const removeItem = (e) => {
        //remove list item upon click on
        let action = { type: 'remove', payload: e.currentTarget.textContent };
        switch (e.target.parentNode.id) {
            case 'ingredientsList':
                updateIngredients(action);
                break;
            case 'stepsList':
                updateSteps(action);
                break;
            default: break;
        }

    }

    const { title, brief, ingredient, quantity, unit, step, type, main, occasion, method, diet, notes } = input;

    //Form validation 
    const { register: registerPrep, handleSubmit: submitPrep, errors: errorsPrep } = useForm(); //react-hook-form package
    const { register: registerIngredients, handleSubmit: submitIngredients, errors: errorsIngredients } = useForm();
    //const stepPattern = / /; //validation pattern for step input
    //const ingredientPattern = / /; //validation pattern for ingredient input
    const quantityPattern = /(^\s*$)|(^\s*[-]?\d+([.,]?\d+)?([\/][-]?\d+([.,]?\d+)?)?\s*$)/;

    //submit function for validation proccess
    const onSubmit = (data, e) => {
        e.preventDefault();
        //step validation
        if (data.hasOwnProperty("step") && !errorsPrep.step) addItem(data, e.timeStamp);
        //ingredient validation
        else if (data.hasOwnProperty("ingredient") && !errorsIngredients.ingredient) addItem(data, e.timeStamp);
    }

    return (
        <>
            <FormGroupArray groups={
                [
                    {
                        id: "title",
                        label: "Title:",
                        control: { as: "input", type: "text", value: title, onChange: handleChange }
                    },
                    {
                        id: "brief",
                        label: "Brief description:",
                        control: { as: "textarea", value: brief, onChange: handleChange }
                    }
                ]}
            />

            <section className="hr">
                <h2>Ingredients</h2>
                <Form onSubmit={submitIngredients(onSubmit)}>
                    <FormGroupArray errors={errorsIngredients} groups={
                        [
                            {
                                id: "ingredient",
                                label: "Ingredient:",
                                control: { as: "input", type: "text", value: ingredient, onChange: handleChange, ref: registerIngredients({ required: true, minLength: 2 }), isInvalid: errorsIngredients.ingredient },
                                message: [{ type: "required", text: "Please insert ingredient" }, { type: "minLength", text: "Ingredient should be at least 2 characters" }],
                            },
                            {
                                id: "quantity",
                                label: "Quantity:",
                                control: { as: "input", type: "text", value: quantity, onChange: handleChange, ref: registerIngredients({ required: true, pattern: quantityPattern }), isInvalid: errorsIngredients.quantity },
                                message: [{ type: "required", text: "Please insert quantity" }, { type: "pattern", text: "Quantity should be a number" }]
                            },
                            {
                                id: "unit",
                                label: "Unit:",
                                control: { as: "input", type: "text", value: unit, onChange: handleChange, ref: registerIngredients(), isInvalid: errorsIngredients.unit },
                                button: { name: "addIngredient", variant: "primary", text: "Add ingredient" }
                            }
                        ]}
                    />
                </Form>
                {ingredients &&
                    <ListGroup as="ul" id="ingredientsList">{ingredients}</ListGroup>
                }
            </section>

            <section className="hr">
                <h2>Preparation</h2>
                <Form onSubmit={submitPrep(onSubmit)}>
                    <Form.Group controlId="step">
                        <Form.Label>Step:</Form.Label>
                        <Form.Control as="input" type="text" name="step" value={step} onChange={handleChange} ref={registerPrep({ required: true, minLength: 2, /*pattern: stepPattern*/ })} isInvalid={errorsPrep.step} />
                        <Form.Control.Feedback type="invalid">
                            {errorsPrep.step && errorsPrep.step.type === "required" && "Please insert step"}
                            {errorsPrep.step && errorsPrep.step.type === "minLength" && "Step should be at least 2 characters"}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" name="addStep" variant="primary">Add step</Button>
                    {steps &&
                        <ListGroup as="ul" id="stepsList">{steps}</ListGroup>
                    }
                </Form>
            </section>

            <section className="hr">
                <h2>Details</h2>
                <FormGroupArray groups={
                    [
                        {
                            id: "type",
                            label: "Type:",
                            control: { as: "input", type: "text", value: type, onChange: handleChange }
                        },
                        {
                            id: "main",
                            label: "Main ingredient(s):",
                            control: { as: "input", type: "text", value: main, onChange: handleChange }
                        },
                        {
                            id: "occasion",
                            label: "Season/Ocasion:",
                            control: { as: "input", type: "text", value: occasion, onChange: handleChange }
                        },
                        {
                            id: "method",
                            label: "Preparation method:",
                            control: { as: "input", type: "text", value: method, onChange: handleChange }
                        },
                        {
                            id: "diet",
                            label: "Dietary consideration:",
                            control: { as: "input", type: "text", value: diet, onChange: handleChange }
                        }
                    ]}
                />
            </section>

            <section className="hr">
                <h2>Notes</h2>
                <Form.Group controlId="notes">
                    <Form.Control as="textarea" name="notes" value={notes} onChange={handleChange} />
                </Form.Group>
            </section>
        </>
    )
}

export default AddRecipe;