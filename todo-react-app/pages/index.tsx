import {
  useState,
  useCallback,
  useMemo,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { useMutation, useQuery } from "@apollo/client";

import { Header, TodoItem } from "components";
import { Task } from "types";

import GET_TODOS from "queries/getTodo";
import ADD_TODO, { QueryVars, QueryData } from "queries/addTodo";
import DELETE_TODO, {
  QueryData as DeleteData,
  QueryVars as DeleteVars,
} from "queries/deleteTodo";
import UPDATE_TODO, {
  QueryData as UpdateData,
  QueryVars as UpdateVars,
} from "queries/updateTodo";

export default function Home() {
  const [todo, setTodo] = useState("");
  const { loading, error, data } = useQuery(GET_TODOS);
  const [addTodo] = useMutation<QueryData, QueryVars>(ADD_TODO);
  const [deleteTodo] = useMutation<DeleteData, DeleteVars>(DELETE_TODO);
  const [updateTodo] = useMutation<UpdateData, UpdateVars>(UPDATE_TODO);

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setTodo(value);
  };

  const handleNewTodoKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveData();
    }
  };

  const saveData = () => {
    addTodo({
      variables: {
        task: [
          {
            title: todo,
            completed: false,
            user: { username: "email.example.com" },
          },
        ],
      },
      refetchQueries: [
        {
          query: GET_TODOS,
        },
      ],
    });
    setTodo("");
  };

  const toggle = (todo: Task) => {
    updateTodo({
      variables: {
        patch: {
          filter: {
            id: [todo.id],
          },
          set: {
            completed: !todo.completed,
          },
        },
      },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };

  const destroy = (todo: Task) =>
    deleteTodo({
      variables: {
        filter: {
          id: [todo.id],
        },
      },
      refetchQueries: [
        {
          query: GET_TODOS,
        },
      ],
    });

  const todoItems = useMemo(() => {
    if (Array.isArray(data?.queryTask)) {
      const todoItems = data.queryTask.map((todo: Task) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => toggle(todo)}
          onDestroy={() => destroy(todo)}
        />
      ));
      return todoItems;
    }
  }, [data]);

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (error) {
    return <h4>{error.name}</h4>;
  }

  return (
    <>
      <Header
        todo={todo}
        handleChange={handleChange}
        onKeyDown={handleNewTodoKeyDown}
      />
      <section className="main">
        <ul className="todo-list">{todoItems}</ul>
      </section>
    </>
  );
}
