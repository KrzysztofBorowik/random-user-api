const sendHttpRequest = (url) => {
  return fetch(url)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response.json().then((errorData) => {
          console.log(errorData);
          throw new Error("Something went wrong - serverside");
        });
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Something went wrong!");
    });
};

async function fetchPerson() {
  try {
    const responseData = await sendHttpRequest("https://randomuser.me/api/");
    console.log(responseData);

    //using destructuring to pull the data from the response
    const {
      name: { first },
      name: { last },
      picture: { large },
      location: { street },
      phone,
      email,
    } = responseData.results[0];

    document.getElementById("first").textContent = first;
    document.getElementById("last").textContent = last;
    document.getElementById("photo").src = large;
    document.getElementById("street").textContent =
      street.name + " " + street.number;
    document.getElementById("phone").textContent = phone;
    document.getElementById("email").textContent = email;
  } catch (error) {
    console.log(error);
  }
}

document.querySelector("button").addEventListener("click", fetchPerson);
