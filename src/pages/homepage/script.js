const toggle = document.querySelector(".toggle")
const greatOne = document.querySelector(".great-one")

toggle.addEventListener("click", async ()=>{
  toggle.classList.toggle("active")

  if(toggle.classList.contains("active")){
    greatOne.style.display = "block"
    
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true})

    const response = await chrome.tabs.sendMessage(tab.id, {action: "startDistractions"})

  }else{
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true})

    const response = await chrome.tabs.sendMessage(tab.id, {action: "stopDistractions"})

    greatOne.style.display = "none"
  }
  })