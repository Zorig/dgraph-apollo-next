import { gql } from "@apollo/client";
import { Task } from "types";

export type QueryData = {
  task: Task;
};

export type QueryVars = {
  task: Task[];
};

const Query = gql`
  mutation addTask($task: [AddTaskInput!]!) {
    addTask(input: $task) {
      task {
        id
        title
      }
    }
  }
`;

export default Query;
