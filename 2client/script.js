const renderCard = (user_management) => {
  const card = document.createElement("div");
  const info = document.createElement("div");
  const title = document.createElement("h2");
  const description = document.createElement("p");
  const sorting = document.createElement("p");

  card.className = "card";
  info.className = "info";

  title.textContent = `${user_management.name} `;
  description.textContent = user_management.description;

  info.append(title, description, sorting);

  card.append(info);

  document.querySelector(".cards").append(card);
};

// const fetchUserManagement = () => {
fetch("http://localhost:3000/user_management")
  .then((resp) => resp.json())
  .then((response) => {
    response.forEach((user_management) => renderCard(user_management));
  })
  .catch((error) => console.error(error));
// };

// fetchUserManagement();
