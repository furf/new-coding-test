import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import withCreateOrder from '../graphql/components/withCreateOrder';
import { getPoissonRandomizer } from '../../lib/poisson';
import data from '../../instructions/orders.json';
import Layout from '../components/Layout';

const ORDERS_PER_SECOND = 3.25;
const random = getPoissonRandomizer(ORDERS_PER_SECOND);

function usePoissonRandomizer(orders, mutate) {
  const [remainingOrders, setRemainingOrders] = useState(orders);
  const [timer, setTimer] = useState();
  const [start] = useState(Date.now());
  const [expectedTick, setExpectedTick] = useState(start);
  const [numToRemove, setNumToRemove] = useState(0);
  const fixedInterval = 1000;

  useEffect(() => {
    const now = Date.now();

    // If no orders remain, exit.
    if (!remainingOrders.length) {
      return;
    }

    // Determine when next update should occur, correcting for execution lag.
    const correction = now - expectedTick;
    const correctedInterval = fixedInterval - correction;
    setExpectedTick(expectedTick + fixedInterval);

    const n = random();
    setNumToRemove(n);

    // Set a timeout until the next tick and store it so it can be cleaned up
    // when component is unmounted.
    setTimer(
      setTimeout(async () => {
        // Determine number of orders to place.
        if (n > 0) {
          const ordersToPlace = remainingOrders.slice(0, n);
          const mutations = ordersToPlace.map(order => {
            return mutate({ variables: order });
          });
          await Promise.all(mutations);
        }

        // Update remaining orders. This executes even if n === 0 to ensure the timer continues.
        setRemainingOrders(remainingOrders.slice(n));
      }, correctedInterval),
    );

    // Cleanup timer if component is unmounted.
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timer);
  }, [remainingOrders]);

  return [remainingOrders, numToRemove];
}

function OrdersPage({ orders, mutate }) {
  const [remainingOrders, numPlaced] = usePoissonRandomizer(orders, mutate);
  const totalPlaced = orders.length - remainingOrders.length;
  return (
    <Layout>
      <Head>
        <title>Order Simulator</title>
      </Head>
      <dl>
        <dt>Orders placed, this tick</dt>
        <dd>{numPlaced}</dd>
        <dt>Orders placed, total</dt>
        <dd>{totalPlaced}</dd>
        <dt>Orders, remaining</dt>
        <dd>{remainingOrders.length}</dd>
        <dt>Total orders</dt>
        <dd>{orders.length}</dd>
      </dl>
      {!remainingOrders.length ? null : (
        <ul>
          {remainingOrders.map(order => (
            <li key={order.id}>
              {order.name} ({order.temp})
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}

OrdersPage.getInitialProps = async function getInitialProps() {
  return {
    orders: data.map((order, i) => Object.assign({ id: `order-${i}` }, order)),
  };
};

OrdersPage.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      temp: PropTypes.string.isRequired,
      shelfLife: PropTypes.number.isRequired,
      decayRate: PropTypes.number.isRequired,
    }),
  ).isRequired,
  mutate: PropTypes.func.isRequired,
};

export default withCreateOrder(OrdersPage);
