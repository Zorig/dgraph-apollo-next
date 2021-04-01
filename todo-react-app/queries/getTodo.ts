import { gql } from "@apollo/client";
import { Task } from "types";

export type QueryVars = {};
export type QueryData = {
  queryTask: Task[];
};

const Query = gql`
  query {
    queryTask {
      id
      title
      completed
    }
  }
`;

export default Query;
