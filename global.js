console.log('IT’S ALIVE!');


const ARE_WE_HOME = document.documentElement.classList.contains('home');
const BASE_PATH = '/portfolio';


function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
    { url: '', title: 'Home' },
    { url: 'contact/', title: 'Contact'},
    { url: 'projects/', title: 'Projects' },
    { url: 'resume/', title: 'Resume'},
    { url: 'https://github.com/desmondvu', title: 'Github'}
  ];

let nav = document.createElement('nav');
document.body.prepend(nav);


for (let p of pages) {
    let url = p.url;
    let title = p.title;

    if (!ARE_WE_HOME && !url.startsWith('http')) {
      url = BASE_PATH + '/' + url;
    }
    
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;  

    if (a.host === location.host && a.pathname === location.pathname) {
      a.classList.add('current');
    }
    if (a.host !== location.host && a.pathname !== location.pathname) {
      a.target = "_blank"
    }
    nav.append(a);   
  }

document.body.insertAdjacentHTML(
    'afterbegin',
    `
      <label class="color-scheme">
          Theme:
          <select>
            <option value = "light dark">Automatic</option>
            <option value = "light">Light</option>
            <option value = "dark">Dark</option>
        </select>
      </label>`
);


let select = document.querySelector(".color-scheme select");
if ("colorScheme" in localStorage) {
    document.documentElement.style.setProperty('color-scheme', localStorage.colorScheme);
    select.value = localStorage.colorScheme;
}

select.addEventListener('input', function (event) {
    document.documentElement.style.setProperty('color-scheme', event.target.value);
    localStorage.colorScheme = event.target.value;
});

export async function fetchJSON(url) {
  try {
      // Fetch the JSON file from the given URL
      const response = await fetch(url);
      
      console.log(response);

      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }

      const data = await response.json();
      return data; 

  } catch (error) {
      console.error('Error fetching or parsing JSON data:', error);
  }
}

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  // Your code will go here
  if (!(containerElement instanceof HTMLElement)) {
    throw new Error('containerElement must be a valid DOM element');
  }

  containerElement.innerHTML = '';
  
  for (const project of projects) {
    const article = document.createElement('article');
    
    article.innerHTML = `
      <h3>${project.title}</h3>
      <img src="${project.image}" alt="${project.title}">
      <p>${project.description}</p>
    `;
    
    containerElement.appendChild(article);
  }
}

export async function fetchGitHubData(username) {
  // return statement here
  return fetchJSON(`https://api.github.com/users/${username}`);
}