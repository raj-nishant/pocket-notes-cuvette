import React, { useState, useEffect } from "react";
import sendIcon from "../assets/send.png";
import sendIcon2 from "../assets/sendIcon2.png";
import back from "../assets/back.png";
import styles from "./Body.module.css";
import { getScreen } from "../utils/helper";

const Body = (props) => {
  const { groupSelect, groups, setGroups } = props;
  const [note, setNote] = useState("");
  const [screenSize, setScreenSize] = useState(getScreen());
  const [currentGroup, setCurrentGroup] = useState(groupSelect);

  useEffect(() => {
    setCurrentGroup(groupSelect);
  }, [groupSelect]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = async () => {
    if (note.trim() !== "") {
      const time = new Date().toLocaleTimeString("en-us", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const date = new Date().toLocaleDateString([], {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      try {
        const response = await fetch(`https://pocket-notes-cuvette.onrender.com/api/groups/${currentGroup._id}/notes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date, time, note }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const updatedGroup = await response.json();
        setCurrentGroup(updatedGroup);
        const newGroups = groups.map(group => 
          group._id === updatedGroup._id ? updatedGroup : group
        );
        setGroups(newGroups);
        setNote("");
      } catch (error) {
        console.error('Error adding note:', error);
        alert('Failed to add note. Please try again.');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={styles.notesContainer}>
      <div className={styles.notesHeader}>
        {screenSize.width < 989 && (
          <img src={back} alt={back} onClick={() => window.location.reload()} />
        )}
        <div
          className={styles.notesGroup}
          style={{ background: currentGroup.color }}
        >
          {currentGroup.groupName?.slice(0, 2)?.toUpperCase()}
        </div>
        <h2 className={styles.groupName}>{currentGroup.groupName}</h2>
      </div>
      <div className={styles.NotesAndDate}>
        {currentGroup?.notes?.map((note, index) => (
          <div className={styles.DateAndText} key={index}>
            <div className={styles.Text}>{note.note}</div>
            <div className={styles.DateAndTime}>
              <p className={styles.Date}>{note.date}</p>
              <p className={styles.Time}>{note.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.Textarea}>
        <textarea
          className={styles.TextInput}
          type="text"
          value={note}
          onChange={handleChange}
          placeholder="Enter your text here..."
          onKeyDown={handleKeyPress}
        ></textarea>
        <img
          src={note.trim() === "" ? sendIcon : sendIcon2}
          className={styles.SendImg}
          alt="SendImg"
          onClick={handleSubmit}
          style={{ cursor: note.trim() === "" ? 'default' : 'pointer' }}
        />
      </div>
    </div>
  );
};

export default Body;