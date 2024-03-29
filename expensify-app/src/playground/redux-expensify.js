import { createStore, combineReducers } from "redux";
import uuid from "uuid";
//combineReducers combines the multiple reducers.

//ADD_EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

//REMOVE_EXPENSE

const removeExpense = ({ id } = {}) => {
  return {
    type: "REMOVE_EXPENSE",
    id,
  };
};
//EDIT_EXPENSE

const editExpense = (id, updates) => {
  return {
    type: "EDIT_EXPENSE",
    id,
    updates,
  };
};
//SET_TEXT_FILTER

const setTextFilter = (text = "") => {
  return {
    type: "SET_TEXT_FILTER",
    text,
  };
};
//SORT_BY_DATE

const sortByDate = () => {
  return {
    type: "SORT_BY_DATE",
  };
};
//SORT_BY_AMOUNT

const sortByAmount = () => {
  return {
    type: "SORT_BY_AMOUNT",
  };
};
//SET_START_DATE

const setStartDate = (startDate) => {
  return {
    type: "SET_START_DATE",
    startDate,
  };
};
//SET_END_DATE

const setEndDate = (endDate) => {
  return {
    type: "SET_END_DATE",
    endDate,
  };
};

const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      const updateState = state.filter((expense) => {
        if (expense.id !== action.id) {
          return expense;
        }
      });
      return updateState;
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};
const filterReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};
const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text,
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date",
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount",
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate,
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate,
      };
    default:
      return state;
  }
};
//Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter((expense) => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate; //if startDate is undefined means the user hasnt filtered for startDate making that item be included for startdate..
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());
      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filter: filterReducer,
  })
);
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filter);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(
  addExpense({ description: "tuitiony", amount: 4000, createdAt: -10000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "why", amount: 800, createdAt: -1000 })
);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));
store.dispatch(setTextFilter("y"));
// store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setEndDate(123));

// store.dispatch(setStartDate(120));
// store.dispatch(setStartDate());

const demoState = {
  expenses: [
    {
      id: "sckokd",
      description: "Rent",
      note: "This is the final payment for that address",
      amount: 54500,
      createdAt: 0,
    },
  ],
  filters: {
    text: "rent",
    sortBy: "amount", //date or amount,
    startDate: undefined,
    endDate: undefined,
  },
};

const user = {
  name: "Shaurya",
  age: 18,
};

console.log({
  // age: 17,//this wont have any effect since it is defined before spreading the object
  ...user,
  location: "JBL",
  age: 17, //the age gets modified now..
});
