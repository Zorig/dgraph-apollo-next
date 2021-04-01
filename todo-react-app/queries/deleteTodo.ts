import { gql } from "@apollo/client";

export type QueryVars = {
  filter: {
    id: [string];
  };
};

export type QueryData = {
  msg: string;
};

const Query = gql`
  mutation deleteTask($filter: TaskFilter!) {
    deleteTask(filter: $filter) {
      msg
    }
  }
`;

export default Query;
