import { useState } from 'react'

export function init(initialState){
    return initialState;
}

export const useInputChange = () => {
    const [input, setInput] = useState({})

    const handleInputChange = (e) => setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.value
    })

    return [input, handleInputChange]
}

export function reducer(state, { field, value, type }) {
    if (type === 'reset') return init(value)
    return {
        ...state,
        [field]: value
    }
}

export function itemReducer(items, action) {
    switch (action.type) {
        case 'add':
            return [...items, action.payload];
        case 'remove':
            let arr = [...items];
            let index = arr.findIndex(el => el.props.children === action.payload);
            arr.splice(index, 1);
            return arr;
        case 'reset':
            return [];
        default:
            throw (Error);
    }
}