export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) {
    return res.status(500).send("Missing GitHub environment variables");
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/dispatches`,
      {
        method: "POST",
        headers: {
          "Accept": "application/vnd.github+json",
          "Authorization": `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          event_type: "webflow_publish"
        })
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).send(`GitHub error: ${text}`);
    }

    return res.status(200).send("QA workflow triggered");
  } catch (error) {
    return res.status(500).send(`Error: ${error.message}`);
  }
}
