let formState = false;
let langState = 'ka';
let form = document.getElementById("createForm");
let button = document.getElementById("openForm");
let postsList = document.getElementById("postList");
let langs = {};

const getLangs = async () => {
  const getData = fetch("https://raw.githubusercontent.com/CrackN147/DinosaurWay/production/data/langs.json?version=1234");
  return await getData.then((responce) => {
    return responce.json();
  });
}

const openForm = () => {
  if (!formState) {
    form.style.display = "flex";
    formState = true;
    button.innerText = langs[langState].closeForm;
  } else {
    form.style.display = "none";
    formState = false;
    button.innerText = langs[langState].openForm;
  }
}

const getPosts = () => {
  if (exists("posts")) {
    return getJson("posts");
  } else {
    return [];
  }
}

const createNewPost = () => {
  let titleValue = document.getElementById("title").value;
  let contentValue = document.getElementById("content").value;
  let posts = getPosts();
  if (posts.length > 0) {
    posts.unshift({
      id: posts.length + 1,
      title: titleValue,
      content: contentValue
    });
    createPostHtml({
      id: posts.length + 1,
      title: titleValue,
      content: contentValue
    })
  } else {
    posts.push({
      id: 1,
      title: titleValue,
      content: contentValue
    });
    createPostHtml({
      id: 1,
      title: titleValue,
      content: contentValue
    })
  }
  set("posts", JSON.stringify(posts));
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  openForm()
}

const openPost = (id) => {
  let content = document.getElementById(`content-${id}`);
  if (content.style.display === "none" || !content.style.display) {
    content.style.display = "block";
  } else {
    content.style.display = "none";
  }
}

const createPostHtml = (value, top = false) => {
  let noPosts = document.getElementById("noPosts");
  if (noPosts) {
    noPosts.remove();
  }
  let post = document.createElement("div");
  post.className = "post";
  let title = document.createElement("h3");
  title.innerText = value.title;
  title.setAttribute("onclick", `openPost(${value.id})`);

  let content = document.createElement("p");
  content.innerText = value.content;
  content.setAttribute("id", `content-${value.id}`);

  post.appendChild(title);
  post.appendChild(content);
  if (top) {
    postsList.append(post);
  } else {
    postsList.prepend(post);
  }
  
}

const changeLanguage = () => {
  if(langState === 'en') {
    langState = 'ka';
  } else {
    langState = 'en';
  }
  document.getElementById("language").innerText = langState;
  document.getElementById("openForm").innerText = langs[langState].openForm;
  // document.getElementById("closeForm").innerText = langs[langState].closeForm;
  document.getElementById("noPosts").innerText = langs[langState].noPosts;
}


window.onload = async () => {
  langs = await getLangs();
  let posts = getPosts();
  if (posts.length > 0) {
    for (let i = 0; i < posts.length; i++) {
      createPostHtml(posts[i], true);
    }
  } else {
    let post = document.createElement("h3");
    post.setAttribute('id', 'noPosts');
    post.innerText = langs[langState].noPosts;
    postsList.appendChild(post);
  }
  document.getElementById("openForm").innerText = langs[langState].openForm;
  document.getElementById("language").innerText = langs[langState].language;
}