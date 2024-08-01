export const getGroupAbbreviation = (groupName) => {
  const words = groupName.split(" ");
  if (words.length === 1) {
    return groupName.slice(0, 2).toUpperCase();
  } else {
    return words
      .map((word, index) => (index < 2 ? word[0] : ""))
      .join("")
      .toUpperCase();
  }
};

export const fetchGroupsFromLocalStorage = async () => {
  const storedGroups = localStorage.getItem("groups");
  if (storedGroups) {
    return JSON.parse(storedGroups);
  }
  return [];
};

export const getScreen = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};
