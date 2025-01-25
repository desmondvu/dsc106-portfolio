console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
    { url: '../index.html', title: 'Home' },
    { url: '../contact/index.html', title: 'Contact'},
    { url: '../projects/index.html', title: 'Projects' },
    { url: '../resume/index.html', title: 'Resume'},
    { url: 'https://github.com/desmondvu', title: 'Github'}
  ];

let nav = document.createElement('nav');
document.body.prepend(nav);


for (let p of pages) {
    let url = p.url;
    let title = p.title;
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);
    
    const ARE_WE_HOME = document.documentElement.classList.contains('home');

    if (!ARE_WE_HOME && !url.startsWith('http')) {
        url = '../' + url;
    }
    
    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');
    }
    
    if (a.host !== location.host) {
        a.target = "_blank";
    }
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
