document.addEventListener('DOMContentLoaded', function() {
    // Game elements
    const videoElement = document.getElementById('game-video');
    const imageElement = document.getElementById('game-image');
    const questionContainer = document.getElementById('question-container');
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const backButton = document.getElementById('back-button');
    const counterDisplay = document.getElementById('counter-display');
    const surpriseContainer = document.getElementById('surprise-container');
    const showSurpriseButton = document.getElementById('show-surprise-button');
    
    // Game state
    let counter = 0;
    const stopFrame = 100; // Approximate - will use video time instead
    
    // Create start button
    const startButton = document.createElement('button');
    startButton.textContent = "Начать игру";
    startButton.style.position = "absolute";
    startButton.style.top = "50%";
    startButton.style.left = "50%";
    startButton.style.transform = "translate(-50%, -50%)";
    startButton.style.padding = "20px 40px";
    startButton.style.fontSize = "24px";
    startButton.style.cursor = "pointer";
    startButton.style.zIndex = "100";
    document.querySelector('.game-container').appendChild(startButton);
    
    // Initialize game
    function initGame() {
        // Reset UI
        videoElement.style.display = 'block';
        imageElement.style.display = 'none';
        questionContainer.style.display = 'none';
        backButton.style.display = 'none';
        surpriseContainer.style.display = 'none';
        
        // Set up video
        videoElement.currentTime = 0;
        videoElement.muted = true; // Mute video to help with autoplay
        
        // Set up video end event (equivalent to reaching stop_frame)
        videoElement.addEventListener('timeupdate', function() {
            // Assuming the video is 10 seconds long and stop_frame is at 5 seconds
            // Adjust this calculation based on your actual video length
            const stopTime = (stopFrame / 30); // Convert frames to seconds assuming 30fps
            
            if (videoElement.currentTime >= stopTime) {
                showInterface();
                videoElement.pause();
            }
        });
    }
    
    // Start game with user interaction
    startButton.addEventListener('click', function() {
        startButton.style.display = 'none';
        videoElement.play()
            .then(() => {
                console.log("Video started successfully");
            })
            .catch(error => {
                console.error("Error playing video:", error);
                // If there's still an issue, show an error message
                alert("Не удалось воспроизвести видео. Пожалуйста, обновите страницу и попробуйте снова.");
            });
    });
    
    function showInterface() {
        // Keep video visible but pause it
        videoElement.pause();
        // Don't hide the video
        // videoElement.style.display = 'none';
        questionContainer.style.display = 'flex';
    }
    
    // Find this section in your code and update the image paths
    function yesAction() {
        counter++;
        counterDisplay.textContent = `Отсосал ${counter} раз`;
        
        questionContainer.style.display = 'none';
        videoElement.style.display = 'none'; // Now hide the video
        imageElement.style.display = 'block';
        backButton.style.display = 'block';
        
        if (counter === 1) {
            imageElement.src = 'static/images/screenshot_5.png'; // Updated path
            // Uncomment to show surprise button
            // surpriseContainer.style.display = 'flex';
        } else {
            imageElement.src = 'static/images/screenshot_1.png'; // Updated path
        }
        
        // Update counter on server - this won't work on GitHub Pages
        // You can remove this or replace with local storage
        /*
        fetch('/update_counter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ counter: counter }),
        });
        */
    }
    
    function noAction() {
        questionContainer.style.display = 'none';
        videoElement.style.display = 'none'; // Now hide the video
        imageElement.style.display = 'block';
        imageElement.src = 'static/images/screenshot_2.png'; // Updated path
        backButton.style.display = 'block';
    }
    
    function showSurprise() {
        imageElement.src = 'static/images/screenshot_4.png'; // Updated path
        surpriseContainer.style.display = 'none';
    }
    
    function resetGame() {
        // Show start button again for user interaction
        startButton.style.display = 'block';
        // Clear the canvas
        videoElement.style.display = 'none';
        imageElement.style.display = 'none';
        questionContainer.style.display = 'none';
        backButton.style.display = 'none';
        // Initialize the game again
        initGame();
    }
    
    // Event listeners
    yesButton.addEventListener('click', yesAction);
    noButton.addEventListener('click', noAction);
    backButton.addEventListener('click', resetGame);
    showSurpriseButton.addEventListener('click', showSurprise);
    
    // Initialize the game (but don't autoplay)
    initGame();
});