var tabLinks = document.getElementsByClassName("tab-links")
var tabContents = document.getElementsByClassName("tab-contents")



function opentab(tabname){
    //removes active tag in all tabs and contents
    for(tabLink of tabLinks){
        tabLink.classList.remove("active-link")
        
    }
    for(tabContent of tabContents){
        tabContent.classList.remove("active-tab")
        
    }
    
    var currentTab = document.getElementById(tabname+"Tab")
    var currentContent = document.getElementById(tabname)
    currentTab.classList.add("active-link")
    currentContent.classList.add("active-tab")
}


// Get the image element
const logoImage = document.getElementById('logo');
const gameDiv = document.getElementById('game');

// Add event listener for "click" event
logoImage.addEventListener('click', function() {
    gameDiv.style.display = "block";
});