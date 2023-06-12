const generateButton = document.getElementById("generate");
const clearButton = document.getElementById("clear");
const formElement = document.querySelector("#filter");


generateButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const formData = new FormData(formElement);
    const gender = formData.get("gender");
    const nationality = formData.get("nationality")
    const amount = +formData.get("number");
    const url = (`https://randomuser.me/api/?gender=${gender}&nat=${nationality}`)
    try {
        for (let i = 0; i < amount; i++) {
            const rawUserData = await fetch(url);
            const parsedUserData = await rawUserData.json();
            console.log(parsedUserData);
            writeData(parsedUserData);
        }
    } catch(err) {
        console.log(err);
    }
    
})

function writeData(userData) {
    const formContainer = document.querySelector(".history-container");

    if (!Array.isArray.userData) {
        userData = [userData];
    }

    for (const i of userData) {
        
        const name = i["results"][0]["name"]["first"] + " " + i["results"][0]["name"]["last"];
        const gender = i["results"][0]["gender"];
        const email = i["results"][0]["email"];
        const nationality = i["results"][0]["nat"];
        const birth = i["results"][0]["dob"]["date"]
            const dateObj = new Date(birth);
            const parsedBirth = dateObj.toISOString().slice(0,10);
        const pic = i["results"][0]["picture"]["thumbnail"];
        const item =
        `
        <div class="history-section">
            <form>
                <fieldset>
                    <label>name: ${name}</label><br>
                    <label>gender: ${gender}</label><br>
                    <label>email: ${email}</label><br>
                    <label>nationality: ${nationality}</label><br>
                    <label>date of birth: ${parsedBirth}</label><br>
                    <img src="${pic}" alt="user picture">
                </fieldset>
            </form>
        </div>
        `;

        formContainer.innerHTML += item;
    }
}


clearButton.addEventListener("click", clearData);

function clearData() {
    let overallData = document.getElementsByClassName("history-section");

    // Convert the HTMLCollection to an array for easier iteration
    const dataArray = Array.from(overallData);

    // Iterate over the array and remove each element
    dataArray.forEach(element => {
        element.remove();
    });
}