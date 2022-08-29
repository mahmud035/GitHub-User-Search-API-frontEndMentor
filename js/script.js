'use strict';

const userInfoContainer = document.getElementById('user-info-Container');
userInfoContainer.style.display = 'none';

document.getElementById('search-field').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const searchElement = document.getElementById('search-field');
    const userName = searchElement.value;
    searchElement.value = '';

    loadUser(userName);
    userInfoContainer.style.display = 'block';
  }
});

const loadUser = (userName) => {
  const url = `https://api.github.com/users/${userName}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayUser(data));
};

const displayUser = (user) => {
  userInfoContainer.textContent = '';

  console.log(user);
  const userInfoDiv = document.createElement('div');
  userInfoDiv.innerHTML = `
       <div class="row">
          <div class="col-5">
            <img
              class="user-profile-picture"
              src="${user?.avatar_url}"
              alt=""
            />
          </div>
          <div class="col-7">
            <h3>${user?.name}</h3>
            <a href="${user?.html_url}" target="_blank" class="text-primary" >${
    user?.login
  }</a>
            <p>Joined ${user?.created_at}</p>
          </div>
        </div>
        <div class="row py-4">
          <p>${user.bio ? user.bio : 'This profile has no bio'}</p>
        </div>

        <div class="row">
          <div class="col">
            <p>Repos</p>
            <h4>${user?.public_repos}</h4>
          </div>
          <div class="col">
            <p>Followers</p>
            <h4>${user.followers}</h4>
          </div>
          <div class="col">
            <p>Following</p>
            <h4>${user.following}</h4>
          </div>
        </div>

        <div class="row row-cols-sm-2 py-4">
          <!-- item-1 -->
          <div class="col d-flex align-items-center gap-3">
            <img src="./images/icon-location.svg" alt="" />
             <a href="https://www.google.com/maps/place/${
               user.location
             } class="mt-2" target="_blank">${
    user?.location ? user?.location : 'Not Available'
  }</a>
          </div>
          <!-- item-2 -->
          <div class="col d-flex align-items-center gap-3">
            <img src="./images/icon-twitter.svg" alt="" />
           <a href="http://twitter.com/${
             user.twitter_username
           }" class="mt-2" target="_blank">${
    user?.twitter_username ? user?.twitter_username : 'Not Available'
  }</a>
          </div>

          <!-- item-3 -->
          <div class="col d-flex align-items-center gap-3">
            <img src="./images/icon-website.svg" alt="" />
         <a href="${user.blog}" class="mt-2" target="_blank">${
    user?.blog ? user.blog : 'Not available'
  }</a>
          </div>

          <!-- item-4 -->
          <div class="col d-flex align-items-center gap-3">
            <img src="./images/icon-company.svg" alt="" />
          <a href="${user?.company}" class="mt-2" target="_blank">${
    user?.company ? user.company : 'Not Available'
  }</a>
          </div>
        </div>
  `;

  userInfoContainer.appendChild(userInfoDiv);
};
