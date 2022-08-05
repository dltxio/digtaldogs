import { GraphQLClient } from "graphql-request";
import { gql } from "graphql-request/dist";

const page = 0;
const pagination = `skip:${page}`;

const query = gql`
  query {
    purchases(first: 1000 ${pagination}) {

      }
  }
`;

export const queryTokens = async () => {
  const client = new GraphQLClient(process.env.REACT_APP_SUBGRAPH_ADDRESS!);
  const data = await client.request(query);
  const tokens = data?.purchases;
  if (tokens == null) throw new Error("Could not read tokens");

  return tokens;
};
