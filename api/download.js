export default async function handler(req, res) {
    const tweetUrl = req.query.url;

    if (!tweetUrl) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        // This example uses a free scraper API
        const apiRes = await fetch(`https://tweetpik.com/api/tweets?url=${encodeURIComponent(tweetUrl)}`);
        const tweetData = await apiRes.json();

        if (tweetData && tweetData.media && tweetData.media.length > 0) {
            const video = tweetData.media.find(m => m.type === "video");
            return res.status(200).json({ videoUrl: video ? video.url : null });
        } else {
            return res.status(404).json({ error: "No video found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch video" });
    }
}
