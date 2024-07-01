import React, { useState } from "react";
import "../css/dashboard.css";
import {TitleComponent2} from "../Components/TitleComponent";

function Dashboard() {
  
  const [activeTab, setActiveTab] = useState([null,"laptops","phones","monitors","networkdevices","printers","miscellaneous"]);

  const handleTabClick = (tab) => {
    setActiveTab(tab === activeTab? null : tab);
  };

  const user = localStorage.getItem("username");
  return (
      <section className="mainDash">
        <TitleComponent2 title={`Hello ${user} 👋🏽`}/>

        <div className="second-row">
          <div className="singleStats">
            <div id="laptops" className={`single-stat ${activeTab === "laptops" ? "active" : ""}`}
            onClick={() => handleTabClick("laptops")} >
              <div className="singleStat-total">
                <i className="fal fa-laptop"></i>
                <h4>Laptops</h4>
                <h1 id="laptops-total">
                  <div className="loading-mini"></div>
                </h1>
              </div>
              <div className="single-stat-extra">
                <div className="extra-stat">
                  <div className="indicator a"></div>
                  <h5>Assigned</h5>
                  <span id="assignedL">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator u"></div>
                  <h5>Usused</h5>
                  <span id="unusedL">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator r"></div>
                  <h5>Retired</h5>
                  <span id="retiredL">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator d"></div>
                  <h5>Damaged</h5>
                  <span id="damagedL">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator o"></div>
                  <h5>Out of Sevice</h5>
                  <span id="oosL">0</span>
                </div>
              </div>
            </div>

            <div className={`single-stat ${activeTab === "phones"? "active" : ""}`}
            onClick={() => handleTabClick("phones")} id="phones">
              <div className="singleStat-total">
                <i className="fal fa-mobile-screen"></i>
                <h4>Phones</h4>
                <h1 id="phones-total">
                  <div className="loading-mini"></div>
                </h1>
              </div>
              <div className="single-stat-extra">
                <div className="extra-stat">
                  <div className="indicator a"></div>
                  <h5>Assigned</h5>
                  <span id="assignedP">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator u"></div>
                  <h5>Usused</h5>
                  <span id="unusedP">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator r"></div>
                  <h5>Retired</h5>
                  <span id="retiredP">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator d"></div>
                  <h5>Damaged</h5>
                  <span id="damagedP">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator o"></div>
                  <h5>Out of Sevice</h5>
                  <span id="oosP">0</span>
                </div>
              </div>
            </div>

            <div className={`single-stat ${activeTab === "monitors"? "active" : ""}`}
            onClick={() => handleTabClick("monitors")} id="monitors">
              <div className="singleStat-total">
                <i className="fal fa-desktop"></i>
                <h4>Monitors</h4>
                <h1 id="monitors-total">
                  <div className="loading-mini"></div>
                </h1>
              </div>
              <div className="single-stat-extra">
                <div className="extra-stat">
                  <div className="indicator a"></div>
                  <h5>Assigned</h5>
                  <span id="assignedM">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator u"></div>
                  <h5>Unsused</h5>
                  <span id="unusedM">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator r"></div>
                  <h5>Retired</h5>
                  <span id="retiredM">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator d"></div>
                  <h5>Damaged</h5>
                  <span id="damagedM">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator o"></div>
                  <h5>Out of Sevice</h5>
                  <span id="oosM">0</span>
                </div>
              </div>
            </div>

            <div className={`single-stat ${activeTab === "networkdevices"? "active" : ""}`}
            onClick={() => handleTabClick("networkdevices")} id="networkdevices">
              <div className="singleStat-total">
                <i className="fal fa-router"></i>
                <h4>Network Devices</h4>
                <h1 id="networkdevices-total">
                  <div className="loading-mini"></div>
                </h1>
              </div>
              <div className="single-stat-extra">
                <div className="extra-stat">
                  <div className="indicator a"></div>
                  <h5>Assigned</h5>
                  <span id="assignedN">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator u"></div>
                  <h5>Unsused</h5>
                  <span id="unusedN">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator r"></div>
                  <h5>Retired</h5>
                  <span id="retiredN">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator d"></div>
                  <h5>Damaged</h5>
                  <span id="damagedN">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator o"></div>
                  <h5>Out of Sevice</h5>
                  <span id="oosN">0</span>
                </div>
              </div>
            </div>

            <div className={`single-stat ${activeTab === "printers"? "active" : ""}`}
            onClick={() => handleTabClick("printers")} id="printers">
              <div className="singleStat-total">
                <i className="fal fa-print"></i>
                <h4>Printers</h4>
                <h1 id="printers-total">
                  <div className="loading-mini"></div>
                </h1>
              </div>
              <div className="single-stat-extra">
                <div className="extra-stat">
                  <div className="indicator a"></div>
                  <h5>Assigned</h5>
                  <span id="assignedPR">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator u"></div>
                  <h5>Unsused</h5>
                  <span id="unusedPR">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator r"></div>
                  <h5>Retired</h5>
                  <span id="retiredPR">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator d"></div>
                  <h5>Damaged</h5>
                  <span id="damagedPR">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator o"></div>
                  <h5>Out of Sevice</h5>
                  <span id="oosPR">0</span>
                </div>
              </div>
            </div>

            <div className={`single-stat ${activeTab === "miscellaneous"? "active" : ""}`}
            onClick={() => handleTabClick("miscellaneous")} id="miscellaneous">
              <div className="singleStat-total">
                <i className="fal fa-stars"></i>
                <h4>miscellaneous</h4>
                <h1 id="misc-total">
                  <div className="loading-mini"></div>
                </h1>
              </div>
              <div className="single-stat-extra">
                <div className="extra-stat">
                  <div className="indicator a"></div>
                  <h5>Assigned</h5>
                  <span id="assignedMSC">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator u"></div>
                  <h5>Unsused</h5>
                  <span id="unusedMSC">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator r"></div>
                  <h5>Retired</h5>
                  <span id="retiredMSC">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator d"></div>
                  <h5>Damaged</h5>
                  <span id="damagedMSC">0</span>
                </div>
                <div className="extra-stat">
                  <div className="indicator o"></div>
                  <h5>Out of Sevice</h5>
                  <span id="oosMSC">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="third-row">
          <div className="left">
            <h4>Recently Added Assets</h4>
            <table className="recAdditions">
              <thead className="thead">
                <th>Category</th>
                <th>Brand</th>
                <th>Model</th>
                <th></th>
                <th>Added By</th>
              </thead>
              <tbody className="tbody" id="recent-table">
                <div className="loading-mini-b" id="loading"></div>
              </tbody>
            </table>
          </div>
          <div className="right">
            <h4>Asset Overview</h4>
            <div className="overview">
              <div className="chart">
                <canvas id="myChart"></canvas>
                <h1 id="totalStatusCount">
                  <div className="loading-mini"></div>
                </h1>
              </div>
              <div className="stats">
                <div className="stat">
                  <div className="indicator a"></div>
                  <h4>Assigned Assets</h4>
                  <span id="aStatusCount">0</span>
                </div>
                <div className="stat">
                  <div className="indicator u"></div>
                  <h4>Unused Assets</h4>
                  <span id="uStatusCount">0</span>
                </div>
                <div className="stat">
                  <div className="indicator r"></div>
                  <h4>Retired Assets</h4>
                  <span id="rStatusCount">0</span>
                </div>
                <div className="stat">
                  <div className="indicator d"></div>
                  <h4>Damaged Assets</h4>
                  <span id="dStatusCount">0</span>
                </div>
                <div className="stat">
                  <div className="indicator o"></div>
                  <h4>Out of Service Assets</h4>
                  <span id="oosStatusCount">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default Dashboard;
