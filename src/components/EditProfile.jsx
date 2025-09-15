import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { UserCard } from "./UserCard";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  // const [emailId, setEmailId] = useState("remmaama@gmail.com");
  // const [password, setPassword] = useState("Remmsama@123");

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        // navigate("/profile/view");
      }, 3000);
    } catch (err) {
      setError(err?.response?.message || "Something went wrong");
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center gap-0 w-full max-w-6xl mx-auto py-10">
        <div className="flex justify-center items-center w-full md:w-1/2 ">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">First Name:</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {/* <p className="label">Optional</p> */}
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Last Name:</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Photo URL:</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Age:</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Gender:</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Choose your Gender"
                    list="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <datalist id="gender">
                    <option value="male"></option>
                    <option value="female"></option>
                  </datalist>
                </fieldset>
                {/* <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">About:</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset> */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About:</legend>
                  <textarea
                    className="textarea h-24"
                    placeholder="Bio"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </fieldset>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full md:w-1/2">
          <div className="card bg-base-300 w-96 shadow-sm">
            <UserCard
              user={{ firstName, lastName, photoUrl, age, gender, about }}
            />
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
