import { graphql } from 'react-apollo';
import createOrder from '../mutations/createOrder.gql';

const withCreateOrder = graphql(createOrder);

export default withCreateOrder;
