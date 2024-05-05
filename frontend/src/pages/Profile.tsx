import { useRecoilState } from "recoil";
import { Appbar } from "../components/Appbar";
import { userInfoAtom } from "../state/user.atom";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserInfo({
      id: "",
      name: "",
      email: "",
    });
    alert("Logged out successfully");
    navigate("/signin");
  };

  return (
    <>
      <div className="fixed w-full">
        <Appbar />
      </div>
      <div className="flex flex-col w-full justify-center items-center h-screen gap-5">
        <p className="text-3xl font-bold">Hello {userInfo.name}</p>
        <button
          className="my-2 w-40 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
};
