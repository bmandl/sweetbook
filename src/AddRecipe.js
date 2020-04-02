import React from 'react';

const AddRecipe = () => {
    return (
        <>
            <div class="form-group">
                <label for="title">Title:</label>
                <input id="title" class="form-control" type="text" name="title" />
            </div>

            <div class="form-group">
                <label for="brief">Brief description:</label>
                <textarea id="brief" class="form-control" name="brief"></textarea>
            </div>

            <section class="hr">
                <h2>Ingredients</h2>
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input id="ingredient" class="form-control" type="text" name="ingredient" />
                </div>

                <div class="form-group">
                    <label for="quantity">Quantity:</label>
                    <input id="quantity" class="form-control" type="text" name="quantity" />
                </div>

                <div class="form-group">
                    <label for="unit">Unit:</label>
                    <select id="unit" class="form-control" name="unit">
                    </select>
                </div>
                <button name="addIngredient" class="btn btn-primary">Add ingredient</button>
            </section>

            <section class="hr">
                <h2>Preparation</h2>
                <div class="form-group">
                    <label for="step">Step:</label>
                    <input id="step" class="form-control" type="text" name="step" />
                </div>
                <button name="addStep" class="btn btn-primary">Add step</button>
            </section>

            <section class="hr">
                <h2>Details</h2>
                <div class="form-group">
                    <label for="type">Type:</label>
                    <input id="type" class="form-control" type="text" name="type" />
                </div>

                <div class="form-group">
                    <label for="main">Main ingredient(s):</label>
                    <input id="main" class="form-control" type="text" name="main" />
                </div>

                <div class="form-group">
                    <label for="occasion">Season/Ocasion:</label>
                    <input id="occasion" class="form-control" type="text" name="occasion" />
                </div>

                <div class="form-group">
                    <label for="method">Preparation method:</label>
                    <input id="method" class="form-control" type="text" name="method" />
                </div>

                <div class="form-group">
                    <label for="diet">Dietary consideration:</label>
                    <input id="diet" class="form-control" type="text" name="diet" />
                </div>
            </section>

            <section class="hr">
                <h2>Notes</h2>
                <div class="form-group">
                    <label for="notes"></label>
                    <textarea id="notes" class="form-control" name="notes"></textarea>
                </div>
            </section>
        </>
    )
}

export default AddRecipe;