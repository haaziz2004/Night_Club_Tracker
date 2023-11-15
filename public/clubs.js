document.addEventListener("DOMContentLoaded", function () {
    const clubs = {
        club1: { name: "Club Arcane", maxCapacity: 100, yellowThreshold: 70 },
        club2: { name: "Club Underground", maxCapacity: 50, yellowThreshold: 30 },
        club3: { name: "Club Soda", maxCapacity: 20, yellowThreshold: 12 },
        club4: { name: "Studio 52", maxCapacity: 52, yellowThreshold: 32 },
    };
    const radioButtons = document.getElementsByName("club");
    const plusButton = document.getElementById("plus-button");
    const minusButton = document.getElementById("minus-button");

    
    plusButton.addEventListener("click", incrementCount);
    minusButton.addEventListener("click", decrementCount);
    function updateMessage(){
        const selectedClub = getSelectedClub()
        const clubElement = document.getElementById(selectedClub);
        const occupancy = parseInt(clubElement.querySelector(".count").textContent)
        const messageElement = clubElement.querySelector(".message")
        if (occupancy < clubs[selectedClub].yellowThreshold ) {
            clubElement.style.backgroundColor = "lightgreen";
            messageElement.textContent = "Welcome!";
        } else if (occupancy < clubs[selectedClub].maxCapacity) {
            clubElement.style.backgroundColor = "#EFFD5F";
            messageElement.textContent = "Warn the bouncers…";
        } else {
            clubElement.style.backgroundColor = "#FF0800";
            messageElement.textContent = "No one allowed in!";
        }
    }

    function getSelectedClub(){
        for (const radio of radioButtons){
            if (radio.checked){
                return radio.value 
            }
        }
    }
    function incrementCount(){
        const selectedClub = getSelectedClub();
        const clubElement = document.getElementById(selectedClub);
        const countElement = clubElement.querySelector(".count");
        let occupancy = parseInt(countElement.textContent);
        if (occupancy < clubs[selectedClub].maxCapacity){
            occupancy++;
            countElement.textContent = occupancy;
            updateMessage();
        }
    }
    function decrementCount() {
        const selectedClub = getSelectedClub();
        const clubElement = document.getElementById(selectedClub);
        const countElement = clubElement.querySelector(".count");
        let occupancy = parseInt(countElement.textContent);
        if (occupancy > 0) {
            occupancy--;
            countElement.textContent = occupancy;
            updateMessage();
        }
    }

});