let intervalId;

const brainRotLinks = [
    "https://www.youtube.com/embed/4XZ1j1CadlQ?si=Un508GBf2qwT0pfV",
     "https://www.youtube.com/embed/zUF0hfFWsYM?si=Bqu9A0SyHG8VlXn", 
     "https://www.youtube.com/embed/4miK09JdKpU?si=5EiOx0VQ0JMetIdz", 
     "https://www.youtube.com/embed/3xWJ0FSgJVE?si=xorSgugnYKf_T0gn",
     "https://www.youtube.com/embed/3PDgSJ393lo?si=wThAXgEgAHafZeR_",
     "https://www.youtube.com/embed/Rm4pR4M6kgo?si=Y15kJppYMCoHbxQ6",
     "https://www.youtube.com/embed/EHKCJyEb1uA?si=346sT4FAFmy5uRVK",
     "https://www.youtube.com/embed/b4XpMTUlorc?si=iPGGYH0TbVGi9jcP",
     "https://www.youtube.com/embed/ZHgyQGoeaB0?si=MyVgGqnJTm8TXKn9",
     "https://www.youtube.com/embed/qybnYKDqcNU?si=JADp1VdgfOJFVmBZ",
     "https://www.youtube.com/embed/h8O7xf8RkCc?si=tpnWspsAl5B35KBN",
     "https://www.youtube.com/embed/Pk8QM3YLGEM?si=Gb8w1UnhXm-5DJZr",
     "https://www.youtube.com/embed/jnPKQV_ifYM?si=Vykv6ilDVP0zAaMu",
     "https://www.youtube.com/embed/dFnV3qDpNLY?si=CVfEwc-wTJg2S2nu",
     "https://www.youtube.com/embed/0sPJvdn1ihI?si=I1APT61_F3GDKVsi",
     "https://www.youtube.com/embed/iAjBUKoMxnY?si=3ISBtU-VFk5SSfC2"
    ]
chrome.runtime.onMessage.addListener(function (message) {
    if (message.action == "startDistractions") {
        if (!intervalId) {
            startRandomIntervals(); // Start the random interval cycle
        }
    } else if (message.action == "stopDistractions") {
        clearTimeout(intervalId); // Clear timeout instead of interval
        intervalId = null;
        console.log("Distractions stopped.");
    }
});

function startRandomIntervals() {
    createAndInsertNewElement(); // Run the function immediately
    const randomDelay = Math.floor(Math.random() * 60000); // Random delay between 0 to 60,000 ms (1 minute)

    // Schedule the next execution after the random delay
    intervalId = setTimeout(() => {
        startRandomIntervals(); // Recursively call to continue the cycle
    }, randomDelay);
}

function createAndInsertNewElement() {
    const randomLink = brainRotLinks[Math.floor(Math.random() * brainRotLinks.length)];
    const oldIFrameContainer = document.querySelector('.iframe-container')

    if (oldIFrameContainer) {
        oldIFrameContainer.remove();
        return;
    }

    document.body.innerHTML += `<div class="iframe-container">
        <button>X</button>
        <iframe id="rot" src="${randomLink}&autoplay=1" title="YouTube video player" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
            gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        </iframe>
    </div>`;

    const closeButton = document.querySelector(".iframe-container button");
    closeButton.addEventListener("click", closeCurrentIframe);
}

function closeCurrentIframe() {
    const iFrameContainer = document.querySelector('.iframe-container');
    if (iFrameContainer) {
        iFrameContainer.remove();
    }
}
