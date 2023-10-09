"use client";
import React from "react";
import { SessionProvider as Provider} from "next-auth/react";
import PropTypes from 'prop-types';

function SessionProvider({ children, session }) {
  return <Provider session={session}>{children}</Provider>;
}

export default SessionProvider;

SessionProvider.propTypes = {
    children: PropTypes.node.isRequired,
};