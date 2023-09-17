"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import PropTypes from 'prop-types';

function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Providers;

Providers.propTypes = {
    children: PropTypes.node.isRequired,
};