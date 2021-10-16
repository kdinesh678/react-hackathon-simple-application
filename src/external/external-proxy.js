export function login(empId, empName) {
  window.localStorage.setItem("empId", empId);
  window.localStorage.setItem("empName", empName);
}

const ideas = [
  {
    ideaId: 1,
    title: "Use JavaScript to Create a Game",
    description:
      "You will use your JavaScript knowledge to create a simple and enjoyable game. There are many games available on the internet that were built through HTML5 and JavaScript. You can start by creating a simple snake game where the player controls the snake and earns a point whenever the snake eats a fruit. The player loses if the snake hits the border (or an obstacle). \nOn the other hand, you can create an advanced game that stands out from the competition, such as a platformer (like Mario) or a puzzle-solving game.  ",
    createdBy: "empId",
    createdDate: "2021-11-11",
    votes: 1,
    isActive: true,
    tags: ["feature", "tech"],
  },
  {
    ideaId: 2,
    title: "A Tool that Generates Weather Reports",
    description:
      "Here, you’ll be creating a tool that generates weather reports for the user. It is among the best hackathon projects for beginners as the prerequisites for this project are pretty simple. You only need to be familiar with advanced web-development and APIs (Application Programming Interfaces) to work on this project.\nFirst, you’ll have to create a website with an easy-to-use interface. Then, you’ll have to use a weather API that will provide you with the required weather information. Your website would receive the API data and show the same in a proper and easy to understand manner.\nYou can use OpenWeatherMap API, Weatherbit API, or AccuWeather API for this project. ",
    createdBy: "empId",
    createdDate: "2021-11-11",
    votes: 1,
    isActive: true,
    tags: ["feature", "tech"],
  },
];
export function getAllIdeas() {
  return ideas;
}

export function getIdeaById() {}
