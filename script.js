let uploadButton = document.getElementById("upload-button");
let chosenImage = document.getElementById("chosen-image");
let fileName = document.getElementById("file-name");
let container = document.querySelector(".container");
let error = document.getElementById("error");
let imageDisplay = document.getElementById("image-display");
let predictButton = document.getElementById("predict");



//// handle drag & drop
const fileHandler = (file, name, type) => {
  if (type.split("/")[0] !== "image") {
    //File Type Error
    error.innerText = "Please upload an image file";
    return false;
  }
  error.innerText = "";
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    //image and file name
    let imageContainer = document.createElement("figure");
    let img = document.createElement("img");
    img.src = reader.result;
    imageContainer.appendChild(img);
    imageContainer.innerHTML += `<figcaption>${name}</figcaption>`;
    imageDisplay.appendChild(imageContainer);
  };
};


uploadButton.addEventListener("change", () => {
  imageDisplay.innerHTML = "";
  Array.from(uploadButton.files).forEach((file) => {
    fileHandler(file, file.name, file.type);
  });
});
container.addEventListener(
  "dragenter",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.add("active");
  },
  false
);
container.addEventListener(
  "dragleave",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.remove("active");
  },
  false
);
container.addEventListener(
  "dragover",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.add("active");
  },
  false
);
container.addEventListener(
  "drop",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.remove("active");
    let draggedData = e.dataTransfer;
    let files = draggedData.files;
    imageDisplay.innerHTML = "";
    Array.from(files).forEach((file) => {
      fileHandler(file, file.name, file.type);
    });
  },
  false
);
window.onload = () => {
  error.innerText = "";
};


//// handle file POST and prediction GET 
const uploadZone = document.getElementById('upload-button');

let file = null;
const baseUrl = 'https://forestapi.bieda.it';


// spinner animation 
predictButton.addEventListener("click", () => {
  if (file != null) {
    predictButton.innerHTML = '';
    predictButton.classList.add("button-19--loading");
  }
});

const getCurrentMode = async () => {
  const response = await fetch(`${baseUrl}/getMyDevice`);
  const data = await response.json();
  document.getElementById('currentMode').innerHTML = data.mode;
}
getCurrentMode();

// console log file information when file is uploaded
uploadZone.addEventListener('change', (e) => {
  file = e.target.files[0];
});


const predict = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${baseUrl}/predict`, {
    method: 'POST',
    body: formData
  });

  const data = await response.json();

  predictButton.classList.remove("button-19--loading");
  predictButton.innerHTML = 'Predict';
  console.log(data);
  let response_string = JSON.stringify(data)
  let parsed = JSON.parse(response_string);
  let message = ''
  if (parsed.state == 'fire') {
    message = 'You should probably call the fire department!'
  }
  if (parsed.state == 'no fire') {
    message = 'Looks good, no fire'
  }
  document.getElementById('response').innerHTML = message;

}

document.getElementById('predict').addEventListener('click', () => {
  predict(file);
});
