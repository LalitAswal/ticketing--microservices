const LandingPage = ({color}) => {
    console.log('checking color', color)
  return (
    <>
      <h1>Landing page</h1>
    </>
  );
};

LandingPage.getInitialProps = () => {
    console.log('i am on the server')
  console.log("testing");

  return {color: `red`};
};

export default LandingPage;
