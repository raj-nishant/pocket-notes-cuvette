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

  const handleSubmit = () => {
    if (note.trim() !== "") {
      const newGroups = [...groups];
      const currentGroup = newGroups[groupSelect.id];
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
      currentGroup.notes.push({ date, time, note });
      localStorage.setItem("groups", JSON.stringify(newGroups));
      setGroups(newGroups);
      setNote("");
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
          style={{ background: groupSelect.color }}
        >
          {groupSelect.groupName?.slice(0, 2)?.toUpperCase()}
        </div>
        <h2 className={styles.groupName}>{groupSelect.groupName}</h2>
      </div>
      <div className={styles.NotesAndDate}>
        {groupSelect.notes.map((note) => (
          <div className={styles.DateAndText} key={note.time}>
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
          disabled={note.trim() === ""}
        />
      </div>
    </div>
  );
};

export default Body;
