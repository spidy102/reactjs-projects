import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense by id if id not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: -1,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should add an expense", () => {
  const expense = {
    id: 100,
    amount: 9000,
    note: "xyz",
  };
  const action = {
    type: "ADD_EXPENSE",
    expense,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});
test("should edit an expense", () => {
  const updates = {
    amount: 8894275,
    note: "jiwfeovj",
  };
  const action = {
    type: "EDIT_EXPENSE",
    id: 1,
    updates,
  };
  const resultToMatch = expenses.filter((expense) => {
    if (action.id === expense.id) {
      return { ...expense, ...updates };
    } else {
      return expense;
    }
  });
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(resultToMatch);
});

test("should not edit an expense if id is not found", () => {
  const updates = {
    amount: 8894275,
    note: "jiwfeovj",
  };
  const action = {
    type: "EDIT_EXPENSE",
    id: -1,
    updates,
  };
  const resultToMatch = expenses;
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(resultToMatch);
});
