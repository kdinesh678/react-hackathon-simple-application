import { getUserDetails } from "../util";

export function login(empId, empName) {
  window.localStorage.setItem("empId", empId);
  window.localStorage.setItem("empName", empName);
}

export function logout() {
  window.localStorage.removeItem("empId");
  window.localStorage.removeItem("empName");
}

const _ideas = [
  {
    ideaId: "1",
    title: "Use JavaScript to Create a Game",
    description:
      "You will use your JavaScript knowledge to create a simple and enjoyable game. There are many games available on the internet that were built through HTML5 and JavaScript. You can start by creating a simple snake game where the player controls the snake and earns a point whenever the snake eats a fruit. The player loses if the snake hits the border (or an obstacle). \nOn the other hand, you can create an advanced game that stands out from the competition, such as a platformer (like Mario) or a puzzle-solving game.  ",
    createdBy: "empId",
    createdDate: "2021-11-15",
    votes: 1,
    isActive: true,
    tags: ["feature", "tech"],
  },
  {
    ideaId: "2",
    title: "A Tool that Generates Weather Reports",
    description:
      "Here, you’ll be creating a tool that generates weather reports for the user. It is among the best hackathon projects for beginners as the prerequisites for this project are pretty simple. You only need to be familiar with advanced web-development and APIs (Application Programming Interfaces) to work on this project.\nFirst, you’ll have to create a website with an easy-to-use interface. Then, you’ll have to use a weather API that will provide you with the required weather information. Your website would receive the API data and show the same in a proper and easy to understand manner.\nYou can use OpenWeatherMap API, Weatherbit API, or AccuWeather API for this project. ",
    createdBy: "empId",
    createdDate: "2021-11-11",
    votes: 10,
    isActive: true,
    tags: ["feature", "tech"],
  },
];

export function getAllIdeas() {
  const ideas = window.localStorage.getItem("ideaList");
  return ideas ? JSON.parse(ideas) : [..._ideas];
}

export function addNewIdea({ title, description, tags }) {
  const { username } = getUserDetails();
  const date = new Date();

  const newIdea = {
    ideaId: `idea_${date.getTime()}`,
    title,
    description,
    tags: tags,
    votes: 0,
    isActive: true,
    createdDate: date.toString(),
    createdBy: username,
  };

  const existingIdeas = getAllIdeas();

  window.localStorage.setItem(
    "ideaList",
    JSON.stringify([...existingIdeas, newIdea])
  );

  return newIdea;
}

export function updateIdea(ideaDetails) {
  const ideas = getAllIdeas();
  let ideaIndex = ideas.findIndex((idea) => idea.ideaId === ideaDetails.ideaId);

  if (ideaIndex !== -1) {
    let idea = ideas[ideaIndex];
    idea = { ...idea, ...ideaDetails };
    ideas.splice(ideaIndex, 1, idea);

    window.localStorage.setItem("ideaList", JSON.stringify(ideas));

    return ideas;
  }
}
