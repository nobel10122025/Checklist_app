const createButton=document.querySelector(".button")
const sectionArea = document.querySelector("section")

const updateLocalStorage = () => {
    textAreaData = document.querySelectorAll("textarea")
    let wishes = []
    textAreaData.forEach(wish => {
        wishes.push(wish.value)
    });
   localStorage.setItem("wishes",JSON.stringify(wishes))
}
const createNewWish = (text = "")=>{
    const wish = document.createElement('div')
    wish.classList.add("container")
    const HTMLData = `
    <div class="icons">
        <div class="edit-icon"><i class="fa fa-magic"></i></div>
        <div class="delete-icon"><i class="fas fa-ban"></i></div>
    </div>
    <div class="main ${text===""?"hidden":""}"></div>
    <textarea class="${text===""?"":"hidden"}" placeholder="enter here..."></textarea>`;
    wish.insertAdjacentHTML('afterbegin',HTMLData);

    // creating references
    const editButton = wish.querySelector(".edit-icon")
    const deleteButton = wish.querySelector(".delete-icon")
    const mainArea = wish.querySelector(".main")
    const textArea = wish.querySelector("textarea")

    //deleting the event
    deleteButton.addEventListener("click",()=>{
        wish.remove();
        updateLocalStorage();
    })
    
    textArea.value=text
    mainArea.innerHTML=text

    //editing the event
    editButton.addEventListener("click",()=>{
        mainArea.classList.toggle("hidden")
        textArea.classList.toggle("hidden")
    })

    textArea.addEventListener('change',(event)=>{
        const value = event.target.value;
        mainArea.innerHTML=value;
        mainArea.classList.toggle("hidden")
        textArea.classList.toggle("hidden")
        updateLocalStorage()
    })
    sectionArea.appendChild(wish);
}

createButton.addEventListener("click",()=> {createNewWish()})

const wishes = JSON.parse(localStorage.getItem("wishes"))
if(wishes){
    wishes.forEach(wish=>createNewWish(wish))
}

//theme toggler
const themeChangerButton = document.getElementById("theme-changer")
themeChangerButton.addEventListener("click",()=>{
    document.body.classList.toggle("dark")
})
    