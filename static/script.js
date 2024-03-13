document.addEventListener('DOMContentLoaded', () => {
    const imageForm = document.getElementById('imageForm');
    const imageContainer = document.getElementById('imageContainer');

    imageForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const prompt = document.getElementById('prompt').value;
        try {
            const response = await fetch('/generate_image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            });
            if (!response.ok) {
                throw new Error('Error generating image');
            }
            const data = await response.json();
            // Clear previous images
            imageContainer.innerHTML = '';
            // Append new image to container
            const imgElement = document.createElement('img');
            imgElement.src = data.url;
            imgElement.alt = 'Generated Image';
            imageContainer.appendChild(imgElement);
        } catch (error) {
            console.error('Error:', error.message);
            imageContainer.innerHTML = `<p>${error.message}</p>`;
        }
    });
});

