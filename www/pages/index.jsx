import React from 'react';
import Head from 'next/head';
import { Subscription } from 'react-apollo';
import expeditorExpedited from '../graphql/subscriptions/expeditorExpedited.gql';
import Layout from '../components/Layout';
import Expeditor from '../components/Expeditor';

function HomePage() {
  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Subscription subscription={expeditorExpedited}>
        {({ data }) => {
          if (!data) return null;
          return <Expeditor expeditor={data.expeditorExpedited} />;
        }}
      </Subscription>
    </Layout>
  );
}

export default HomePage;
