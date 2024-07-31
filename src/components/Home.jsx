import React, { useState, useEffect } from "react";
import banner from "../assets/Banner.png";
import lock from "../assets/lock.png";
import "./Home.css";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [groupSelect, setGroupSelect] = useState(null);
  const [groups, setGroups] = useState([]);
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

    // Mock function to fetch groups from local storage
    const fetchGroupsFromLocalStorage = async () => {
      // Mock data
      const storedGroups = [
        { id: 1, groupName: "Group 1", color: "red" },
        { id: 2, groupName: "Group 2", color: "blue" },
      ];
      return storedGroups;
    };

    fetchGroupsFromLocalStorage().then((storedGroups) => {
      setGroups(storedGroups);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleGroupClick = (group) => {
    setGroupSelect(group);
  };

  // Mock function to get group abbreviation
  const getGroupAbbreviation = (groupName) => {
    return groupName.split(" ").map(word => word[0]).join("");
  };

  const renderGroupList = () => {
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

  return (
    <>
      {screenSize.width < 989 ? (
        <div className="sidebarContainerMobile">
          {groupSelect ? (
            <div>
              {/* Placeholder for Body component */}
              <h1>{groupSelect.groupName} Details</h1>
            </div>
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

          {openModal && (
            <div>
              {/* Placeholder for Modal component */}
              <div className="modal">
                <button onClick={() => setOpenModal(false)}>Close</button>
                {/* Modal content goes here */}
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="sidebarContainer">
            <h1 className="heading">Pocket Notes</h1>
            <button className="CreateButton" onClick={() => setOpenModal(true)}>
              +
            </button>
            {renderGroupList()}
          </div>
          {openModal && (
            <div>
              {/* Placeholder for Modal component */}
              <div className="modal">
                <button onClick={() => setOpenModal(false)}>Close</button>
                {/* Modal content goes here */}
              </div>
            </div>
          )}
          <div className="MessageAreaContainer">
            {groupSelect ? (
              <div>
                {/* Placeholder for Body component */}
                <h1>{groupSelect.groupName} Details</h1>
              </div>
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
        </>
      )}
    </>
  );
};

export default Home;
