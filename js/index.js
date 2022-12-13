const API_URL = "https://dummyjson.com";
const LOCAL_STORAGE_LOGIN_KEY = "USER";

const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE_LOGIN_KEY);
  window.location.reload();
};

const onLoadIndex = () => {
  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LOGIN_KEY));
  if (!user || !user.token) {
    window.location.href = "./Login.html";
  } else {
    fetchData();
  }
};

//////////////get posts by search//////////////

const searchBtn = document.getElementById("post-search");
const searchBox = document.getElementById("search-box");
const postsContainer = document.getElementById("all-posts");
const searchPost = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/posts/search?q=${searchBox.value}`
    );
    console.log(response);
    const {
      data: { posts },
    } = response;

    postsContainer.innerHTML = "";
    posts.forEach((post) => {
      const { body, tags, id, reactions, title, userId } = post;
      // TODO: Create Post

      // Create post div
      const topDiv = document.createElement("div");
      topDiv.setAttribute("class", "card gedf-card");

      // Create  header div for name
      const headNameDiv = document.createElement("div");
      headNameDiv.setAttribute("class", "card-header");

      // Create  header div2 for name
      const headNameDiv2 = document.createElement("div");
      headNameDiv2.setAttribute(
        "class",
        "d-flex justify-content-between align-items-center"
      );

      // Create  header div3 for name
      const headNameDiv3 = document.createElement("div");
      headNameDiv3.setAttribute(
        "class",
        "d-flex justify-content-between align-items-center"
      );

      // Create  head of name body for name
      const nameBody = document.createElement("div");
      nameBody.setAttribute("class", "ml-2");

      // Create  first name div for name
      const firstName = document.createElement("div");
      firstName.setAttribute("class", "h5 m-0");
      const firstNameText = document.createTextNode(id);
      firstName.appendChild(firstNameText);
      // Create  last name div for name
      const lastName = document.createElement("div");
      lastName.setAttribute("class", "h7 text-muted");
      const lastNameText = document.createTextNode(userId);
      lastName.appendChild(lastNameText);

      nameBody.appendChild(firstName);
      nameBody.appendChild(lastName);

      headNameDiv3.appendChild(nameBody);
      headNameDiv2.appendChild(headNameDiv3);
      headNameDiv.appendChild(headNameDiv2);
      topDiv.appendChild(headNameDiv);

      //section 2 post title and post body of post
      //create parent div of title and body of post
      const titleBodyParent = document.createElement("div");
      titleBodyParent.setAttribute("class", "card-body");

      //create link for title of post
      const titleLink = document.createElement("a");
      titleLink.setAttribute("class", "card-link");

      //create h5 for title of post
      const titleDiv = document.createElement("h5");
      titleDiv.setAttribute("class", "general_clr1 card-title");

      const titleText = document.createTextNode(title);
      titleDiv.appendChild(titleText);
      titleLink.appendChild(titleDiv);
      titleBodyParent.appendChild(titleLink);

      //create p for body of post
      const bodyTextp = document.createElement("p");
      bodyTextp.setAttribute("class", "card-text");

      const bodyText = document.createTextNode(body);
      bodyTextp.appendChild(bodyText);
      titleBodyParent.appendChild(bodyTextp);

      topDiv.appendChild(titleBodyParent);

      //create tags for post
      //create parent div of tag
      const tagDiv = document.createElement("div");
      tagDiv.setAttribute("class", "tagcolor");
      //create span of tags
      tags.forEach((tag) => {
        const tagSpan1 = document.createElement("span");
        tagSpan1.setAttribute("class", "general_clr badge");

        const tagSpan1Text = document.createTextNode(tag);
        tagSpan1.appendChild(tagSpan1Text);
        tagDiv.appendChild(tagSpan1);
      });
      topDiv.appendChild(tagDiv);

      //create post footer div
      //create footer div
      const postFooterDiv = document.createElement("div");
      postFooterDiv.setAttribute("class", "card-footer");
      //show reactions

      const likeReaction = document.createElement("a");
      likeReaction.setAttribute("class", "general_clr1 card-link");

      //create icon of like
      const likeIcon = document.createElement("i");
      likeIcon.setAttribute("class", "fa fa-gittip");

      const likeReactionText = document.createTextNode(reactions);
      likeReaction.appendChild(likeIcon);
      likeReaction.appendChild(likeReactionText);

      postFooterDiv.appendChild(likeReaction);
      topDiv.appendChild(postFooterDiv);

      //get comments with posts
      getAllComments(id, topDiv);

      document.getElementById("all-posts").appendChild(topDiv);
    });
  } catch (exception) {
    console.error(exception);
    throw exception;
  }
};
searchBtn.addEventListener("click", () => {
  searchPost();
});

// all users
const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    console.log(response);
    const {
      data: { users },
    } = response;
    users.forEach((user) => {
      const { username, image } = user;

      // Create List Node
      const listNode = document.createElement("li");
      listNode.setAttribute("class", "clearfix  mb-1");

      //Create Image Node
      const imageNode = document.createElement("img");
      imageNode.setAttribute("alt", "avatar");
      imageNode.setAttribute("src", image);

      //Create About Div
      const aboutDivNode = document.createElement("div");
      aboutDivNode.setAttribute("class", "about");

      //Create Name Div
      const nameDivNode = document.createElement("div");
      nameDivNode.setAttribute("class", "name");
      const nameTextNode = document.createTextNode(username);
      nameDivNode.appendChild(nameTextNode);

      aboutDivNode.appendChild(nameDivNode);

      listNode.appendChild(imageNode);
      listNode.appendChild(aboutDivNode);

      document.getElementById("users-list").appendChild(listNode);
    });
  } catch (exception) {
    console.error(exception);
    throw exception;
  }
};

const getPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    console.log(response);
    const {
      data: { posts },
    } = response;
    posts.forEach((post) => {
      const { body, tags, id, reactions, title, userId } = post;
      // TODO: Create Post

      // Create post div
      const topDiv = document.createElement("div");
      topDiv.setAttribute("class", "card gedf-card mb-3");

      // Create  header div for name
      const headNameDiv = document.createElement("div");
      headNameDiv.setAttribute("class", "card-header");

      // Create  header div2 for name
      const headNameDiv2 = document.createElement("div");
      headNameDiv2.setAttribute(
        "class",
        "d-flex justify-content-between align-items-center"
      );

      // Create  header div3 for name
      const headNameDiv3 = document.createElement("div");
      headNameDiv3.setAttribute(
        "class",
        "d-flex justify-content-between align-items-center"
      );

      // Create  head of name body for name
      const nameBody = document.createElement("div");
      nameBody.setAttribute("class", "ml-2");

      // Create  first name div for name
      const firstName = document.createElement("div");
      firstName.setAttribute("class", "h5 m-0");
      const firstNameText = document.createTextNode(id);
      firstName.appendChild(firstNameText);
      // Create  last name div for name
      const lastName = document.createElement("div");
      lastName.setAttribute("class", "h7 text-muted");
      const lastNameText = document.createTextNode(userId);
      lastName.appendChild(lastNameText);

      nameBody.appendChild(firstName);
      nameBody.appendChild(lastName);

      headNameDiv3.appendChild(nameBody);
      headNameDiv2.appendChild(headNameDiv3);
      headNameDiv.appendChild(headNameDiv2);
      topDiv.appendChild(headNameDiv);

      //section 2 post title and post body of post
      //create parent div of title and body of post
      const titleBodyParent = document.createElement("div");
      titleBodyParent.setAttribute("class", "card-body");

      //create link for title of post
      const titleLink = document.createElement("a");
      titleLink.setAttribute("class", "card-link");

      //create h5 for title of post
      const titleDiv = document.createElement("h5");
      titleDiv.setAttribute("class", "general_clr1 card-title");

      const titleText = document.createTextNode(title);
      titleDiv.appendChild(titleText);
      titleLink.appendChild(titleDiv);
      titleBodyParent.appendChild(titleLink);

      //create p for body of post
      const bodyTextp = document.createElement("p");
      bodyTextp.setAttribute("class", "card-text");

      const bodyText = document.createTextNode(body);
      bodyTextp.appendChild(bodyText);
      titleBodyParent.appendChild(bodyTextp);

      topDiv.appendChild(titleBodyParent);

      //create tags for post
      //create parent div of tag
      const tagDiv = document.createElement("div");
      tagDiv.setAttribute("class", "tagcolor");
      //create span of tags
      tags.forEach((tag) => {
        const tagSpan1 = document.createElement("span");
        tagSpan1.setAttribute("class", "color general_clr badge");

        const tagSpan1Text = document.createTextNode(tag);
        tagSpan1.appendChild(tagSpan1Text);
        tagDiv.appendChild(tagSpan1);
      });
      topDiv.appendChild(tagDiv);

      //create post footer div
      //create footer div
      const postFooterDiv = document.createElement("div");
      postFooterDiv.setAttribute("class", "card-footer");
      //show reactions

      const likeReaction = document.createElement("a");
      likeReaction.setAttribute("class", "general_clr1 card-link");

      //create icon of like
      const likeIcon = document.createElement("i");
      likeIcon.setAttribute("class", "fa fa-gittip");

      const likeReactionText = document.createTextNode(reactions);
      likeReaction.appendChild(likeIcon);
      likeReaction.appendChild(likeReactionText);

      postFooterDiv.appendChild(likeReaction);
      topDiv.appendChild(postFooterDiv);

      //create comment field & button

      const commentHeadDiv = document.createElement("div");
      commentHeadDiv.setAttribute("class", "coment-bottom  ");
      const commentInputDiv = document.createElement("div");
      commentInputDiv.setAttribute(
        "class",
        "d-flex flex-row add-comment-section mt-1"
      );
      const commentInput = document.createElement("input");
      commentInput.setAttribute("class", "form-control mr-3");
      commentInput.setAttribute("id", "cmnt-txt");
      const commentButton = document.createElement("button");
      commentButton.setAttribute("class", "general_clr btn btn-primary");
      commentButton.textContent = "Comment";
      // commentButton.setAttribute("onclick", "addComment()");
      commentButton.onclick = function addComment() {
        // alert("hello");
        const selfComment = document.getElementById("cmnt-txt").value;
        //////////////////////

        //create footer div
        const postFooterDiv = document.createElement("div");
        postFooterDiv.setAttribute("class", "card-footer");
        postFooterDiv.setAttribute("id", "footer-div-parent");

        //create comment head div
        const commentHeadDiv = document.createElement("div");
        commentHeadDiv.setAttribute("class", "coment-bottom  px-4");

        //create comment text div
        const commentTextDiv = document.createElement("div");
        commentTextDiv.setAttribute("class", "comment-text-sm");

        //create span for comment
        const commentSpan = document.createElement("span");
        commentSpan.setAttribute("class", "cmnt");

        const commentText = document.createTextNode(selfComment);

        //create edit link
        const editLink = document.createElement("a");
        editLink.setAttribute("class", "btn link-muted ml-5");
        //create edit link icon
        const editLinkIcon = document.createElement("i");
        editLinkIcon.setAttribute("class", " fas fa-pencil-alt ms-2");
        editLink.appendChild(editLinkIcon);
        //create delete link
        const deleteLink = document.createElement("a");
        deleteLink.setAttribute("class", "btn link-muted ml-2");
        //create edit link icon
        const deleteLinkIcon = document.createElement("i");
        deleteLinkIcon.setAttribute("class", " fas fa-trash-alt ms-2 ");
        deleteLink.appendChild(deleteLinkIcon);
        deleteLink.setAttribute("onClick", "deleteComment()");

        commentSpan.appendChild(commentText);
        commentSpan.appendChild(editLink);
        commentSpan.appendChild(deleteLink);
        commentTextDiv.appendChild(commentSpan);
        commentHeadDiv.appendChild(commentTextDiv);

        postFooterDiv.appendChild(commentHeadDiv);
        topDiv.appendChild(postFooterDiv);

        /////////////////////////
      };

      commentInputDiv.appendChild(commentInput);
      commentInputDiv.appendChild(commentButton);
      commentHeadDiv.appendChild(commentInputDiv);
      postFooterDiv.appendChild(commentHeadDiv);
      topDiv.appendChild(postFooterDiv);

      //get comments with posts
      getAllComments(id, topDiv);

      document.getElementById("all-posts").appendChild(topDiv);
    });
  } catch (exception) {
    console.error(exception);
    throw exception;
  }
};

const deleteComment = () => {
  // alert("ok");
  const del = document.getElementById("footer-div-parent");
  del.innerHTML = "";
};

const getAllComments = async (id, postNode) => {
  try {
    const response = await axios.get(`${API_URL}/comments/post/${id}`);
    // console.log(response);
    const {
      data: { comments },
    } = response;

    const topDiv = document.createElement("div");
    topDiv.setAttribute("class", "card gedf-card");

    comments.forEach((comment) => {
      const { id, body, postId, user } = comment;

      //create footer div
      const postFooterDiv = document.createElement("div");
      postFooterDiv.setAttribute("class", "card-footer");

      //create comment head div
      const commentHeadDiv = document.createElement("div");
      commentHeadDiv.setAttribute("class", "coment-bottom p-2 px-4");

      //create comment text div
      const commentTextDiv = document.createElement("div");
      commentTextDiv.setAttribute("class", "comment-text-sm");

      //create span for comment
      const commentSpan = document.createElement("span");
      commentSpan.setAttribute("class", "cmnt");

      const commentText = document.createTextNode(body);

      //create edit link
      const editLink = document.createElement("a");
      editLink.setAttribute("class", "link-muted ml-5");
      //create edit link icon
      const editLinkIcon = document.createElement("i");
      editLinkIcon.setAttribute("class", "fas fa-pencil-alt ms-2");
      editLink.appendChild(editLinkIcon);
      //create delete link
      const deleteLink = document.createElement("a");
      deleteLink.setAttribute("class", "link-muted ml-2");
      //create edit link icon
      const deleteLinkIcon = document.createElement("i");
      deleteLinkIcon.setAttribute("class", "fas fa-trash-alt ms-2 ");
      deleteLink.appendChild(deleteLinkIcon);

      commentSpan.appendChild(commentText);
      commentSpan.appendChild(editLink);
      commentSpan.appendChild(deleteLink);
      commentTextDiv.appendChild(commentSpan);
      commentHeadDiv.appendChild(commentTextDiv);

      postFooterDiv.appendChild(commentHeadDiv);
      topDiv.appendChild(postFooterDiv);
      postNode.appendChild(topDiv);
    });
  } catch (exception) {
    console.error(exception);
    throw exception;
  }
};

const fetchData = () => {
  try {
    Swal.fire({
      onBeforeOpen: Swal.showLoading,
      onOpen() {
        getAllUsers();
        getPosts();
        // searchPost();

        Swal.close();
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      background: "#F0F0F0",
      color: "white",
      text: "Please wait while system is fetching data.",
    });
  } catch (exception) {
    Swal.close();
    console.error(JSON.stringify(exception));
  }
};
