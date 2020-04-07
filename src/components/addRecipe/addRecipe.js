import React, { useReducer } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import FormGroupArray from '../formGroupArray';
import { init, itemReducer, reducer } from './inputHandlers';

//controlled inputs initial state
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

const AddRecipe = () => {

    //state reducers for input elements and list elements
    const [input, dispatch] = useReducer(reducer, initialState, init);
    const [ingredients, updateIngredients] = useReducer(itemReducer, []);
    const [steps, updateSteps] = useReducer(itemReducer, []);

    //event handler for input elements
    /*const handleChange = e => {
        dispatch({ field: e.target.name, value: e.target.value })
    }*/

    //handler for adding list item elements
    async function addItem(fields) {
        //add list item with input field value         
        let values = [];
        let keys = [];
        for (const key in fields) {
            values.push(fields[key]);
            keys.push(key);
        }
        const valid = await triggerValidation(keys);
        if (!valid) return;

        let action = { type: 'add', payload: <ListGroup.Item name={values[0]} ref={register} onClick={removeItem}>{values.join(' ')}</ListGroup.Item> };
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
        //clear input fields
        //keys.forEach(key => dispatch({ field: key, value: '' }))
        keys.forEach(key => {
            setValue(key, '');
        })
    }

    //handler for removing list item elements
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

    //state object for input elements
    const { title, brief, ingredient, quantity, unit, step, type, main, occasion, method, diet, notes } = input;
    //Form validation 
    const { register, unregister, handleSubmit, errors, watch, triggerValidation, setValue, clearError, reset } = useForm(); //react-hook-form package    
    const quantityPattern = /(^\s*$)|(^\s*[-]?\d+([.,]?\d+)?([\/][-]?\d+([.,]?\d+)?)?\s*$)/;
    const requiredMessage = "This field is required";

    //Create recipe from from data
    let createRecipe = (title, brief, ingredientsList, stepsList, type, main, occasion, method, diet, notes) => {

        let ingredients = ingredientsList.map(el => el.props.children);
        let steps = stepsList.map(el => el.props.children);
        let details = { type, main, occasion, method, diet };

        return { title, brief, ingredients, steps, details, notes }
    }

    //submit recipe data
    const submitRecipe = (data, e) => {
        e.preventDefault();
        let recipe = createRecipe(data.title, data.brief, ingredients, steps, data.type, data.main, data.occasion, data.method, data.diet, data.notes);
        //reset input fields and lists
        reset();
        updateIngredients({ type: 'reset' });
        updateSteps({ type: 'reset' });
        //sending POST request to backend server
        fetch("/api/recipe/add", {
            method: "POST",
            body: JSON.stringify(recipe)
        }).then(response => {
            if (response.status === 200)
                return response.json();
            else throw new Error("Something went wrong on api server");
        }).then((data) => {
            console.debug(data);
        }).catch(error => {
            console.error(error);
        });
    }

    //If ingredients or steps list is not empty, unregister input fields to allow submit form
    const checkLists = () => {
        if (ingredients.length > 0) unregister(["ingredient", "quantity", "unit"]);
        if (steps.length > 0) unregister("step");
    }

    //Actual element for addRecipe form
    return (
        <Form onSubmit={handleSubmit(submitRecipe)}>
            {/*TITLE AND BRIEF DESCRIPTION*/}
            <FormGroupArray errors={errors} groups={
                [
                    {
                        id: "title",
                        label: "Title:",
                        control: { as: "input", type: "text", ref: register({ required: true }), isInvalid: errors.title },
                        message: [{ type: "required", text: requiredMessage }]
                    },
                    {
                        id: "brief",
                        label: "Brief description:",
                        control: { as: "textarea", ref: register({ required: true }), isInvalid: errors.brief },
                        message: [{ type: "required", text: requiredMessage }]
                    }
                ]}
            />
            {/*////////////////////////////////////////////////////////////////////////////////////////////*/}

            {/*SECTION INGREDIENTS*/}
            <section className="hr">
                <h2>Ingredients</h2>
                <FormGroupArray errors={errors} groups={
                    [
                        {
                            id: "ingredient",
                            label: "Ingredient:",
                            control: { as: "input", type: "text", ref: register({ required: true, minLength: 2 }), isInvalid: errors.ingredient },
                            message: [{ type: "required", text: requiredMessage }, { type: "minLength", text: "Ingredient should be at least 2 characters" }],
                        },
                        {
                            id: "quantity",
                            label: "Quantity:",
                            control: { as: "input", type: "text", ref: register({ required: true, pattern: quantityPattern }), isInvalid: errors.quantity },
                            message: [{ type: "required", text: requiredMessage }, { type: "pattern", text: "Quantity should be a number" }]
                        },
                        {
                            id: "unit",
                            label: "Unit:",
                            control: { as: "input", type: "text", ref: register({ required: true }), isInvalid: errors.unit },
                            message: [{ type: "required", text: requiredMessage }],
                            button: { name: "addIngredient", variant: "primary", text: "Add ingredient", onClick: () => addItem({ ingredient: watch("ingredient"), quantity: watch("quantity"), unit: watch("unit") }) }
                        }
                    ]}
                />
                {ingredients &&
                    <ListGroup as="ul" id="ingredientsList">{ingredients}</ListGroup>
                }
            </section>
            {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

            {/*SECTION PREPARATION*/}
            <section className="hr">
                <h2>Preparation</h2>
                <Form.Group controlId="step">
                    <Form.Label>Step:</Form.Label>
                    <Form.Control as="input" type="text" name="step" ref={register({ required: true, minLength: 2, /*pattern: stepPattern*/ })} isInvalid={errors.step} />
                    <Form.Control.Feedback type="invalid">
                        {errors.step && errors.step.type === "required" && requiredMessage}
                        {errors.step && errors.step.type === "minLength" && "Step should be at least 2 characters"}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button name="addStep" variant="primary" onClick={() => addItem({ step: watch('step') })}>Add step</Button>
                {steps &&
                    <ListGroup as="ul" id="stepsList">{steps}</ListGroup>
                }
            </section>
            {/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

            {/*SECTION DETAILS*/}
            <section className="hr">
                <h2>Details</h2>
                <FormGroupArray errors={errors} groups={
                    [
                        {
                            id: "type",
                            label: "Type:",
                            control: { as: "input", type: "text", ref: register({ required: true }), isInvalid: errors.type },
                            message: [{ type: "required", text: requiredMessage }]
                        },
                        {
                            id: "main",
                            label: "Main ingredient(s):",
                            control: { as: "input", type: "text", ref: register({ required: true }), isInvalid: errors.main },
                            message: [{ type: "required", text: requiredMessage }]
                        },
                        {
                            id: "occasion",
                            label: "Season/Ocasion:",
                            control: { as: "input", type: "text", ref: register({ required: true }), isInvalid: errors.occasion },
                            message: [{ type: "required", text: requiredMessage }]
                        },
                        {
                            id: "method",
                            label: "Preparation method:",
                            control: { as: "input", type: "text", ref: register({ required: true }), isInvalid: errors.method },
                            message: [{ type: "required", text: requiredMessage }]
                        },
                        {
                            id: "diet",
                            label: "Dietary consideration:",
                            control: { as: "input", type: "text", ref: register({ required: true }), isInvalid: errors.diet },
                            message: [{ type: "required", text: requiredMessage }]
                        }
                    ]}
                />
            </section>
            {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

            {/*SECTION NOTES*/}
            <section className="hr">
                <h2>Notes</h2>
                <Form.Group controlId="notes">
                    <Form.Control as="textarea" name="notes" ref={register({ required: true })} isInvalid={errors.notes} />
                    <Form.Control.Feedback type="invalid">
                        {errors.step && errors.step.type === "required" && requiredMessage}
                    </Form.Control.Feedback>
                </Form.Group>
            </section>
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

            <Button type="submit" name="submitRecipe" variant="primary" size="lg" onClick={checkLists} block>Add recipe</Button>
        </Form>
    )
}
export default AddRecipe;
