fetch(`/api/hospitals`)
        .then((response) => response.json())
        .then((hospitals) => {
          // Get the papers div element from the HTML
          const papersDiv = document.getElementById("papers");

          // Loop through the papers and create a card for each one
          hospitals.forEach((hospital) => {
            const card = document.createElement("div");
            card.classList.add("card");
            const title = document.createElement("h1");
            title.textContent = `${hospital.name}`;
            card.appendChild(title);
            // Add a class to the card based on the status
            // if (paper.status === "pending") {
            //   card.classList.add("pending");
            // } else if (paper.status === "accepted") {
            //   card.classList.add("accepted");
            // } else if (paper.status === "rejected") {
            //   card.classList.add("rejected");
            // }
            card.setAttribute("onclick", "location.href='#';");
            card.setAttribute("style", "cursor: pointer; display:flex; flex-direction:row; align-items:center;text-align:center;");
            papersDiv.appendChild(card);
          });
        });