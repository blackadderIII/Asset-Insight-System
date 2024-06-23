import React from "react";
import  '../css/settings.css'
import { TitleComponent2 } from "../Components/TitleComponent";


export default function Settings() {
  return (
    <div>
      <section className="mainSettings">
        <TitleComponent2 title={"Settings"} />

        <div className="second-row">
          <section>
            <div className="userinfo">
              <div className="pp">
                <img src="./profiles/profile.jpg" id="diplayProfilePicture" />
                <span id="saveProfilePicture">Save</span>
              </div>
              <div className="user-info">
                <h1 id="user-name"></h1>
                <p id="user-email"></p>
              </div>
              <div className="context-menu" id="context-menu">
                <label for="selectProfilePic">Change Picture</label>
                <input
                  type="file"
                  name="profilePicture"
                  id="selectProfilePic"
                  hidden
                  accept="image/*"
                />
                <span onclick="removeProfilePic()">Remove Picture</span>
              </div>
            </div>
            <hr />
            <div className="changePassword">
              <h4>Change Password</h4>

              <p>Change your password should you feel the need to</p>

              <div className="fields">
                <div className="field">
                  <label for="">Current Password</label>
                  <input type="password" id="currentPassword" required />
                </div>
                <div className="field">
                  <label for="">New Password</label>
                  <input type="password" id="newPassword" required />
                </div>
                <div className="field">
                  <label for="">Confirm New Password</label>
                  <input type="password" id="confirmNewPassword" required />
                </div>
                <button onclick="changePassword()" id="changePasswordBtn">
                  Change Password
                </button>
              </div>
            </div>
            <hr />
            <button className="logout" id="logout">
              Logout
            </button>
            <div className="links-container">
              <span className="links" onclick="openAbout()">
                About
              </span>
            </div>
          </section>
        </div>
      </section>
      
      <div class="about-module" id="about-module">
        <i class="fas fa-times" onclick="closeAbout()"></i>
        <img src="./assets/logo/assetman.io.png" alt=""/>
        <h2>Asset Manager.io</h2>
        <span>v1.0.0</span>
    </div>
    </div>
  );
}
