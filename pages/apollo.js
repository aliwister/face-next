import Layout from "../components/Layout";
import Submit from "../components/Submit";
import { withApollo } from "../lib/apollo";

const ApolloPage = () => (
  <Layout>
    <Submit />
  </Layout>
);

export default withApollo(ApolloPage);
