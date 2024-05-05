import { useRecoilValue } from "recoil";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import { userInfoAtom } from "../state/user.atom";

export const Appbar = () => {
    const userInfo = useRecoilValue(userInfoAtom)
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center cursor-pointer font-bold"
      >
        Blog App
      </Link>
      <div>
        <Link to={`/publish`}>
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            New
          </button>
        </Link>

        <Link to={"/profile"}>
        <Avatar size={"big"} name={userInfo.name} />
        </Link>
      </div>
    </div>
  );
};
