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


  const scriptURL = 'https://script.google.com/macros/s/AKfycbwQvOxKCwe6nn3DkSp7H2nGCwNaq48jHC0KeB1LDfKH8qqRS8hMel8Yn8sUUcwzdkVDZQ/exec'
  const form = document.forms['submit-to-google-sheet']
    const msg = document.getElementById("msg")
  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        msg.innerHTML = "Message sent successfully"
        setTimeout(function(){
            msg.innerHTML = ""
        },5000)
        form.reset()
        console.log('Success!', response)
      })
        
      .catch(error =>{
        msg.innerHTML = "ERROR: Message was not sent"
        setTimeout(function(){
            msg.innerHTML = ""
        },5000)
        console.error('Error!', error.message)
      }
        )
  })