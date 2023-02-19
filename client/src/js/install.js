const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  console.log(event);
  event.preventDefault();

  //--Storing triggered events--
  window.defferedPrompt = event;

  //--Toggling hidden class--
  butInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  console.log("---Clicked---");
  const promptEvent = window.defferedPrompt;

  if (!promptEvent) {
    return;
  }

  //--Showing prompt--
  promptEvent.prompt();

  //--Resetting defferedPrompt--
  window.defferedPrompt = null;

  //--Toggling hidden class--
  butInstall.classList.toggle("hidden", true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("-----INSTALLED----");

  //--Clearing prompt--
  window.defferedPrompt = null;
});
