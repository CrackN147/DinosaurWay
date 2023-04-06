let formState = false;
let form = document.getElementById("createForm");
let button = document.getElementById("openForm");
let postsList = document.getElementById("postList");
const openForm = () => {
  if (!formState) {
    form.style.display = "flex";
    formState = true;
    button.innerText = "ფორმის დახურვა";
  } else {
    form.style.display = "none";
    formState = false;
    button.innerText = "ფორმის გახსნა";
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


window.onload = () => {
  let posts = getPosts();
  if (posts.length > 0) {
    for (let i = 0; i < posts.length; i++) {
      createPostHtml(posts[i], true);
    }
  } else {
    let post = document.createElement("h3");
    // post.innerText = "პოსტები არ არის";
    // post.setAttribute('id', 'noPosts');
    // postsList.appendChild(post);
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      console.log(JSON.parse(this.responseText));
    }
    xhttp.open("GET", "https://raw.githubusercontent.com/CrackN147/DinosaurWay/production/html/noPosts.html", true);
    xhttp.send();
  }
}