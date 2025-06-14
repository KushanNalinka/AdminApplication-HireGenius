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

export async function retrieveContributionData(userName: any) {
  const variables = `
  {
    "userName": "${userName}"
  }
`;
  const body = {
    query,
    variables,
  };
  const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  const weeks =
    data.data.user.contributionsCollection.contributionCalendar.weeks;
  return { userName, weeks };
}
