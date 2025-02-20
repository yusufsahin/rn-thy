import { createContext, useReducer } from "react";

const initialState = { count: 0 };

const counterReducer = (state, action) => {

    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        case 'DECREMENT':
            return { count: state.count - 1 };
        case "RESET":
            return { count: 0 };
        default:
            return state;
    }
}

export const CounterContext= createContext();

export const CounterProvider = ({ children }) => {
    const [state,dispatch] =useReducer(counterReducer,initialState);
    return (
        <CounterContext.Provider value={{ count: state.count, dispatch }}>
            {children}
        </CounterContext.Provider>
    )
}