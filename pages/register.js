import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import mainImage from "../public/mainImage.png";
import Blobs1 from "../public/Blobs1.png";
import Blobs2 from "../public/Blobs2.png";
import Blobs3 from "../public/Blobs3.png";

import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import Link from "next/link";
const provider = new GoogleAuthProvider();

const RegisterForm = () => {
  const { authUser, isLoading, setAuthUser } = useAuth();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && authUser) {
      router.push("/");
    }
  }, [authUser, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, email, password } = data;
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: username,
      });
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  const provider = new GoogleAuthProvider();
  const handleGoogleSignUp = async () => {
    try {
      const googleUser = await signInWithPopup(auth, provider);
      console.log(googleUser);
    } catch (error) {
      console.log(error);
    }
  };
  return isLoading || (!isLoading && authUser) ? (
    <Loader />
  ) : (
    <section className="linear-gradient flex justify-center items-center w-full h-[100vh] ">
      <div className="flex items-center w-[800px] max-[820px]:w-[90%] max-[820px]:mx-auto max-[640px]:w-[70%] max-[500px]:w-[90%] h-fit sm:h-[600px] mb-1 bg-white relative rounded-2xl overflow-hidden shadow-md ">
        <div className="w-[300px] h-full bg-[#e6f3ffbf] relative hidden sm:flex flex-col overflow-hidden ">
          <div className=" absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] z-[10] ">
            <Image src={mainImage} width={400} />
          </div>
          <div className=" absolute top-[50%] translate-x-[-0%] left-[50%] translate-y-[-70%] z-[5] ">
            <Image src={Blobs1} width={400} />
          </div>
          <div className=" absolute top-[50%] translate-x-[-70%] left-[50%] translate-y-[-10%] z-[3] ">
            <Image src={Blobs2} width={400} />
          </div>
          <div className=" absolute top-[50%] translate-x-[-90%] left-[50%] translate-y-[-90%] z-[1] ">
            <Image src={Blobs3} width={400} />
          </div>
        </div>
        <div className=" w-[500px] h-full flex justify-center items-center ">
          <div className="flex flex-col gap-1 w-[90%] mx-auto h-[90%] p-[20px] ">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-2"
            >
              <div className=" w-full text-center ">
                <p className=" text-[24px] max-[675px]:text-[22px] max-[640px]:text-[24px] font-bold  ">
                  Create your Account
                </p>
              </div>
              <div className=" w-full flex flex-col">
                <label
                  htmlFor="name"
                  className=" text-[#7C838A] text-[18px] font-medium pl-2 "
                >
                  Fullname
                </label>
                <input
                  type="text"
                  id="name"
                  name="username"
                  required
                  autoComplete="off"
                  value={data.username}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className=" bg-[#B0BAC366] rounded-[20px] h-[45px] p-2"
                />
              </div>
              <div className=" w-full flex flex-col ">
                <label
                  htmlFor="email"
                  className=" text-[#7C838A] text-[18px] font-medium pl-2 "
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  autoComplete="off"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className=" bg-[#B0BAC366] rounded-[20px] h-[45px] p-2"
                />
              </div>
              <div className=" w-full flex flex-col ">
                <label
                  htmlFor="password"
                  className=" text-[#7C838A] text-[18px] font-medium pl-2 "
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  autoComplete="off"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className=" bg-[#B0BAC366] rounded-[20px] h-[45px] p-2"
                />
              </div>

              <div className=" w-full text-center mt-2 ">
                <button className=" w-[250px] px-5 py-2 bg-[#F9ED32] rounded-xl font-bold text-gray-800 ">
                  Create Account
                </button>
              </div>
            </form>
            <div>
              <p className=" text-[#7C838A] ">
                Don't have an account?
                <span className=" text-[#f9ed32] ">
                  {" "}
                  <Link href={"/login"}>login</Link>
                </span>
              </p>
            </div>
            <div className=" w-full text-center ">
              <p className=" text-[#B0BAC3] font-medium text-xl ">- OR -</p>
            </div>
            <div className="w-full text-center flex justify-center items-center">
              <button
                className=" border-[#7C838A] border-[1px] rounded-[15px] px-2 py-1 flex justify-center items-center gap-1 "
                onClick={handleGoogleSignUp}
              >
                <FcGoogle size={30} />{" "}
                <span className="text-[#b0bac3]">Singup with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
