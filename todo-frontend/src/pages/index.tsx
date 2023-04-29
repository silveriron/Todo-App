const Main = () => {
  return <></>;
};

export const getServerSideProps = async () => {
  return {
    props: {},
    redirect: {
      destination: "/todo",
    },
  };
};

export default Main;
