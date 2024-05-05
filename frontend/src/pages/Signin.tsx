import QuoteComponent from "../components/QuoteComponent";
import SigninCard from "../components/SigninCard"

function Signin() {
  return <div>
    <div className="flex">
      <div className="w-full lg:w-1/2">
        <SigninCard />
      </div>
      <div className="w-0 lg:w-1/2 invisible lg:visible">
        <QuoteComponent />
      </div>
    </div>
  </div>;
}

export default Signin;
