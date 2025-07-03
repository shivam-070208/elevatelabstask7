const userList = document.getElementById("userList");
const errorDiv = document.getElementById("error");
const reloadBtn = document.getElementById("reloadBtn");

async function fetchUsers() {
  userList.innerHTML = "";
  errorDiv.textContent = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const users = await response.json();

    users.forEach(user => {
      const userDiv = document.createElement("div");
      userDiv.classList.add("user");
      userDiv.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;
      userList.appendChild(userDiv);
    });
  } catch (error) {
    errorDiv.textContent = "Failed to fetch data. Please check your internet connection.";
    console.error(error);
  }
}

// Reload button handler
reloadBtn.addEventListener("click", fetchUsers);

// Initial fetch on page load
fetchUsers();
