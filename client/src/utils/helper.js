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

export const fetchGroupsFromAPI = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/groups');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching groups:', error);
    return [];
  }
};

export const getScreen = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};