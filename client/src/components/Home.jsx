import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Body from "./Body";
import banner from "../assets/Banner.png";
import lock from "../assets/lock.png";
import "./Home.css";
import {
  getGroupAbbreviation,
  fetchGroupsFromAPI,
} from "../utils/helper";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [groupSelect, setGroupSelect] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    setLoading(true);
    fetchGroupsFromAPI().then((fetchedGroups) => {
      setGroups(fetchedGroups);
      setLoading(false);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleGroupClick = (group) => {
    setGroupSelect(group);
  };

  const renderGroupList = () => {
    if (loading) {
      return (
        <div className="LoadingContainer">
          <div className="Loader"></div>
          <p className="LoadingMessage">Loading groups...</p>
          <p className="DelayMessage">In start, it may take time due to free backend service</p>
        </div>
      );
    }

    return (
      <div className="GroupList">
        {groups.map((group) => (
          <div
            key={group.id}
            className={`groupItem ${groupSelect === group ? "selected" : ""}`}
            onClick={() => handleGroupClick(group)}
          >
            <div className="groupIcon" style={{ background: group.color }}>
              {getGroupAbbreviation(group.groupName)}
            </div>
            <h2 className="groupName">{group.groupName}</h2>
          </div>
        ))}
      </div>
    );
  };

  const renderSidebar = () => (
    <div className="sidebarContainer">
      <h1 className="heading">Pocket Notes</h1>
      <button className="CreateButton" onClick={() => setOpenModal(true)}>
        +
      </button>
      {renderGroupList()}
    </div>
  );

  const renderMessageArea = () => (
    <div className="MessageAreaContainer">
      {groupSelect ? (
        <Body
          groupSelect={groupSelect}
          groups={groups}
          setGroups={setGroups}
        />
      ) : (
        <>
          <div className="MessageAreaText">
            <img src={banner} alt="banner" />
            <h1 className="MessageAreaHeading">Pocket Notes</h1>
            <p className="MessageAreaDescription">
              Send and receive messages without keeping your phone online.
              <br /> Use Pocket Notes on up to 4 linked devices and 1
              mobile phone
            </p>
          </div>
          <footer className="MessageAreaFooter">
            <img src={lock} alt="lock" />
            &nbsp; end-to-end encrypted
          </footer>
        </>
      )}
    </div>
  );

  return (
    <>
      {screenSize.width < 989 ? (
        <div className="sidebarContainerMobile">
          {groupSelect ? (
            <Body
              groupSelect={groupSelect}
              groups={groups}
              setGroups={setGroups}
            />
          ) : (
            <>
              <h1 className="headingMobile">Pocket Notes</h1>
              <button
                className="CreateButtonMobile"
                onClick={() => setOpenModal(true)}
              >
                +
              </button>
              {renderGroupList()}
            </>
          )}
        </div>
      ) : (
        <>
          {renderSidebar()}
          {renderMessageArea()}
        </>
      )}
      {openModal && (
        <Modal
          closeModal={setOpenModal}
          setGroups={setGroups}
          groups={groups}
        />
      )}
    </>
  );
};

export default Home;