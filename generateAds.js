var imgs = ["img\\Art_Auction.png", "img\\BBB_Chicken.png", "img\\Big_Rig_Pizza.png", "img\\Breaking_News.png", "img\\Cowboy_Travel.png", "img\\Home_For_Sale.png"];

function createPopupImage() {
    // Create the popup image container
    const popupImage = document.createElement('div');
    popupImage.classList.add('popup-image');
    popupImage.style.position = 'absolute';


    // Create the inner container
    const innerContainer = document.createElement('div');
    innerContainer.style.position = 'relative';

    // Create the close button
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.style.position = 'absolute';
    closeButton.style.top = '0';
    closeButton.style.right = '0';
    closeButton.style.background = 'red';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.textContent = 'X';

    // Create the image element
    const image = new Image();
    image.src = imgs[Math.floor(Math.random() * imgs.length)];
    image.alt = 'Popup Image';
    image.style.display = 'none';
    image.style.width = '300px';

    // Calculate and log the aspect ratio once the image is loaded
    image.onload = function () {
        const aspectRatio = image.naturalWidth / image.naturalHeight;

        let imgWidth = 300;
        let imgHeight = imgWidth / aspectRatio;

        //get page widths and heights
        let pageWidth = document.documentElement.scrollWidth;
        let pageHeight = document.documentElement.scrollHeight;

        let left = Math.random() * (pageWidth - imgWidth);
        let top = Math.random() * (pageHeight - imgHeight);

        popupImage.style.top = `${top}px`;
        popupImage.style.left = `${left}px`;
        image.style.display = 'block';
    };

    // Append elements to the DOM
    innerContainer.appendChild(closeButton);
    innerContainer.appendChild(image);
    popupImage.appendChild(innerContainer);
    document.body.appendChild(popupImage);
}

function generateRandomImage() {
    if (currentTab - 1 === popupAdsOrder) {
        createPopupImage();
    }
}

setInterval(generateRandomImage, 5000);



// Event listener to handle the removal of popup images
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('close-button')) {
        var popupImage = event.target.closest('.popup-image');
        popupImage.parentNode.removeChild(popupImage);
    }
});

function removeAllPopups() {
    const popups = document.querySelectorAll('.popup-image');
    popups.forEach(popup => popup.remove());
}