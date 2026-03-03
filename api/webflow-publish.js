export default async function handler(req, res) {
  return res.status(200).json({
    tokenExists: !!process.env.GITHUB_TOKEN,
    ownerValue: process.env.GITHUB_OWNER,
    repoValue: process.env.GITHUB_REPO
  });
}
