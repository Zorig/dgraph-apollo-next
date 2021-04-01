import { gql } from "@apollo/client";

export type QueryVars = {
  patch: {
    filter: {
      id: [string];
    };
    set: {
      completed: boolean;
    };
  };
};

export type QueryData = {
  task: {
    id: string;
    title: string;
    completed: boolean;
  };
};

const Query = gql`
  mutation updateTask($patch: UpdateTaskInput!) {
    updateTask(input: $patch) {
      task {
        id
        title
        completed
      }
    }
  }
`;

export default Query;
