import { ReactNode, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userInfoAtom } from "../state/user.atom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fetchUserInfo = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://backend.rglairgamer.workers.dev/api/v1/user/info`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const fetchedUserInfo = await axios(config);
    return { err: null, userInfo: fetchedUserInfo.data };
  } catch (error) {
    return { err: error, userInfo: null };
  }
};

function Protected({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const initUser = async () => {
        const { err, userInfo } = await fetchUserInfo();
        if (!err) {
          setUserInfo(userInfo);
        } else {
          console.log("server error while fetching user details");
        }
      };

      initUser();
    } else {
      navigate("/signin");
    }
  }, [setUserInfo]);

  return <>{userInfo ? <div>{children}</div> : <p>Loading...</p>}</>;
}

export default Protected;
