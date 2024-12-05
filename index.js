// Image names and URLs
const images = [
    { name: "A group of nude figures intertwine while nibbling on a gargantuan, succulent strawberry", image: "/Users/katheliaclare/Documents/_CCA/2024-FALL/Web to Print/_Final-SearchBar/KatheliaCode2/Assets/Strawberry.png" },
    { name: "Duo caresses inside glistening bubble", image: "/Users/katheliaclare/Documents/_CCA/2024-FALL/Web to Print/_Final-SearchBar/12-04/Assets/Bubble.png" },
    { name: "Others are crushed by colossal, disembodied ears", image: "Assets/Ears.png" },
    { name: "One figure places a spray of pretty flowers into the bum of another", image: "Assets/flowers.png" },
    { name: "They feast from the mouths of giant birds", image: "Assets/Giantbird.png" },
    { name: "Another resigned to life with sheet music written on his ass", image: "Assets/Sheetmusic.png" },
    { name: "Mermaid seduces sea-monster clad in armor", image: "Assets/Mermaid.png" },
    { name: "And huddle orgiastically inside flower petals and pools", image: "Assets/Pools.png" },
    { name: "The avaricious are gobbled up by a bird-bug who excretes them out into an abyss of suffering souls", image: "/Users/katheliaclare/Documents/_CCA/2024-FALL/Web to Print/_Final-SearchBar/12-04/Assets/BirdBug.png" },
];

// Grab elements from the DOM
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxIframe = document.getElementById("lightbox-iframe");
const openPageButton = document.getElementById("openPageButton");

// Handle search input
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  searchResults.innerHTML = ""; // Clear previous results

  if (query === "") {
    searchResults.style.display = "none";
    return;
  }

  // Filter images by the first letter of the name
  const filteredImages = images.filter((image) =>
    image.name.toLowerCase().charAt(0) === query.charAt(0)
  );

  if (filteredImages.length === 0) {
    const noResults = document.createElement("li");
    noResults.textContent = "No results found.";
    noResults.style.color = "gray";
    searchResults.appendChild(noResults);
  } else {
    filteredImages.forEach((image) => {
      const listItem = document.createElement("li");
      listItem.textContent = image.name;
      listItem.classList.add("search-result-item");

      // Add click event to open the Lightbox with the selected image
      listItem.addEventListener("click", () => openLightbox(image.image));

      searchResults.appendChild(listItem);
    });
  }

  searchResults.style.display = "block"; // Show the results dropdown
});

// Function to open Lightbox for images
function openLightbox(imageUrl) {
  lightboxImage.src = imageUrl;
  lightboxImage.style.display = "block"; // Show image
  lightboxIframe.style.display = "none"; // Hide iframe
  lightbox.classList.add("visible"); // Show Lightbox
  
    // Reset image dimensions for centering
    lightboxImage.onload = () => {
        lightboxImage.style.width = "auto";
        lightboxImage.style.height = "auto";
      };

      
    // Dynamically set the text for printing 
    const image = images.find(img => img.image === imageUrl);
    const lightboxText = document.getElementById("lightbox-text");
    lightboxText.textContent = image ? image.name : "No description available";
}

// Function to open Lightbox for a page
openPageButton.addEventListener("click", () => {
  const pageUrl = "/Users/katheliaclare/Documents/_CCA/2024-FALL/Web to Print/_Final-SearchBar/12-04/info.html"; // Specify the URL of the page you want to show in the Lightbox
  lightboxIframe.src = pageUrl;
  lightboxIframe.style.display = "block"; 
  lightboxImage.style.display = "none"; 
  lightbox.classList.add("visible"); 
});

// Function to close Lightbox
function closeLightbox() {
  lightbox.classList.remove("visible"); // Hide the Lightbox
  lightboxIframe.src = ""; // Clear iframe content
  lightboxImage.src = ""; // Clear image content
}

// Close Lightbox when clicking outside the image or on the close button
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.classList.contains("close")) {
    closeLightbox();
  }
});