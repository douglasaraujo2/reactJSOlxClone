import React from "react";
import { Link } from 'react-router-dom';

const Page = () => {
  return (
    <>
      <div>Página inicial</div>
      <Link to="/about">Ir para sobre</Link>
    </>
  );
};

export default Page;
