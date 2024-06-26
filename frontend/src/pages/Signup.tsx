import SignupCard from "../components/SignupCard";
import QuoteComponent from "../components/QuoteComponent";

function Signup() {
  return (
    <div className="flex">
      <div className="w-full lg:w-1/2">
        <SignupCard />
      </div>
      <div className="w-0 lg:w-1/2 invisible lg:visible">
        <QuoteComponent />
      </div>
    </div>
  );
}

export default Signup;
