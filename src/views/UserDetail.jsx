import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import CircularProgress from "../components/CircularProgress";

export default function UserDetail() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const CircleSize = 200;

  return (
    <div className="container_centered">
      {!user && <p>Loading...</p>}
      {user && (
        <div>
          <img src={user.image} className="profile_image" alt={user.username} />
          <div className="paragraphs_columns">
            <div className="small_margin">
              <p>Username:</p>
              <p>Email:</p>
              {user.role === "admin" && <p>Role:</p>}
              <p>Donated amout:</p>
              <p>Credits wallet:</p>
            </div>
            <div className="small_margin">
              <p className="bolder_text">{user.username}</p>
              <p className="bolder_text">{user.email}</p>
              {user.role === "admin" && (
                <p className="bolder_text">{user.role}</p>
              )}
              <p className="bolder_text bigger_text">
                {user.donated_total} cr.
              </p>
              <p className="bolder_text bigger_text">
                {user.credits_wallet} cr.
              </p>
            </div>
          </div>
          <CircularProgress
            progress={user.donated_total % 100}
            size={CircleSize}
          />
          <div className="small_margin">
            <p>Hero Level:</p>
            <p className="bolder_text bigger_text">
              {Math.floor(user.donated_total / 100)}
            </p>
          </div>
          <div>
            {isLoggedIn && (
              <button className="btn">
                <Link to={`/users/edit/me`}>Edit</Link>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
