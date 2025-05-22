const query = `
query($userName:String!) {
  user(login: $userName){
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
`;

export async function retrieveContributionData(userName: string) {
  const variables = {
    userName: userName,
  };

  const body = {
    query,
    variables,
  };

  const TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // 👈 Access from .env

  if (!TOKEN) {
    throw new Error("GitHub token is not defined in environment variables.");
  }

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  const weeks =
    data.data.user.contributionsCollection.contributionCalendar.weeks;
  return { userName, weeks };
}
