document.getElementById("downloadBtn").addEventListener("click", async () => {
    const url = document.getElementById("tweetUrl").value.trim();
    if (!url) {
        alert("Please enter a Tweet link");
        return;
    }

    try {
        const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.videoUrl) {
            document.getElementById("result").innerHTML =
                `<a href="${data.videoUrl}" download>Click here to download video</a>`;
        } else {
            document.getElementById("result").innerText = "Video not found.";
        }
    } catch (err) {
        console.error(err);
        alert("Error fetching video.");
    }
});
