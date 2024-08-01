import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = (props) => {
  const [formData, setFormData] = useState({ grpName: "", color: "" });
  const setGroups = props.setGroups;
  const groups = props.groups;
  const color = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };
  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener("resize", Screen);
    return () => window.removeEventListener("resize", Screen);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeColor = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.getAttribute("color"),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedGroupName = formData.grpName.trim().toLowerCase();

    const existingGroup = groups.find(
      (group) => group.groupName.trim().toLowerCase() === trimmedGroupName
    );

    if (existingGroup) {
      alert(
        "A group with the same name already exists. Choose a different name."
      );
      return;
    }

    if (formData.color === "") {
      alert("Please select a color");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupName: formData.grpName,
          color: formData.color,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newGroup = await response.json();
      setGroups([...groups, newGroup]);
      props.closeModal(false);
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Failed to create group. Please try again.');
    }
  };

  return (
    <>
      {screenSize.width < 989 ? (
        <>
          <div className={styles.modalBackgroundMobile}>
            <div className={styles.modalContainerMobile}>
              <span>
                <button
                  className={styles.closeButtonMobile}
                  onClick={() => props.closeModal(false)}
                >
                  X
                </button>
              </span>
              <h2 className={styles.modalHeadingMobile}>Create New Group</h2>

              <label className={styles.modalGrpMobile}>Group Name</label>
              <input
                type="text"
                className={styles.modalTextMobile}
                name="grpName"
                placeholder="Enter your group name"
                onChange={handleChange}
              />

              <br />
              <label className={styles.modalColorMobile}>Choose Colour</label>
              {color.map((color, index) => (
                <button
                  className={`${styles.colorButtonMobile} ${
                    formData.color === color ? "selected" : ""
                  }`}
                  name="color"
                  color={color}
                  key={index}
                  id={color}
                  style={{
                    height: "30px",
                    width: "30px",
                    background: color,
                    borderRadius: "25px",
                    border: "none",
                    marginLeft: "0.5rem",
                  }}
                  onClick={handleChangeColor}
                ></button>
              ))}
              <br />
              <button
                className={styles.modalCreateMobile}
                onClick={handleSubmit}
                disabled={formData.grpName.trim() === ""}
              >
                Create
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.modalBackground}>
          <div className={styles.modalContainer}>
            <span>
              <button
                className={styles.closeButton}
                onClick={() => props.closeModal(false)}
              >
                X
              </button>
            </span>
            <h2 className={styles.modalHeading}>Create New Group</h2>
            <label className={styles.modalGrp}>Group Name</label>
            <input
              type="text"
              className={styles.modalText}
              name="grpName"
              placeholder="Enter your group name"
              onChange={handleChange}
            />
            <label className={styles.modalColor}>Choose Colour</label>
            {color.map((color, index) => (
              <button
                className={`${styles.colorButton}  ${
                  formData.color === color ? "selected" : ""
                }`}
                name="color"
                color={color}
                key={index}
                id={color}
                style={{
                  height: "40px",
                  width: "40px",
                  background: color,
                  borderRadius: "25px",
                  border: "none",
                  marginRight: "10px",
                }}
                onClick={handleChangeColor}
              ></button>
            ))}
            <button
              className={styles.modalCreate}
              onClick={handleSubmit}
              disabled={formData.grpName.trim() === ""}
            >
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;