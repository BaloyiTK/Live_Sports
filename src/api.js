import moment from "moment";
require('dotenv').config(); 


const baseUrl = "https://livescore6.p.rapidapi.com";
const options = {
  method: "GET",
  headers: {
    'X-RapidAPI-Key': 'aa82e81b37msh813fbd8d43f9e93p11bec2jsn47bbab258f4f',
    "X-RapidAPI-Host": "livescore6.p.rapidapi.com",
  },
};

export const fetchLiveMatches = async () => {
  try {
    const response = await fetch(`${baseUrl}/matches/v2/list-live`, options);

    if (response.ok) {
      const data = await response.json();
      return data.Stages;
    } else {
      throw new Error(
        `Failed to fetch live matches. Status: ${response.status}`
      );
    }
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchAllMatchesByDate = async (date) => {
  try {
    const matchDate = moment(date).format("yyyy:MM:DD");
    const dateString =
      matchDate.slice(0, 4) + matchDate.slice(5, 7) + matchDate.slice(8, 10);

    const response = await fetch(
      `${baseUrl}/matches/v2/list-by-date?Category=soccer&Date=${dateString}&Timezone=2`,
      options
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(
        `Failed to fetch matches by date. Status: ${response.status}`
      );
    }
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchLeagueTable = async (compSt) => {
  try {
    const response = await fetch(
      `${baseUrl}/leagues/v2/get-table?Category=soccer&${compSt}`,
      options
    );

    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      throw new Error(
        `Failed to fetch league table. Status: ${response.status}`
      );
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const fetchLeagues = async () => {
  try {
    const response = await fetch(
      `${baseUrl}/leagues/v2/list?Category=soccer`,
      options
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Failed to fetch leagues. Status: ${response.status}`);
    }
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchMatchesByLeague = async (Ccd, Scd) => {
  try {
    const response = await fetch(
      `${baseUrl}/matches/v2/list-by-league?Category=soccer&Ccd=${Ccd}&Scd=${Scd}&Timezone=2`,
      options
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Failed to fetch leagues. Status: ${response.status}`);
    }
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchNews = async () => {
  try {
    const response = await fetch(`${baseUrl}/news/v2/list`, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Failed to fetch news. Status: ${response.status}`);
    }
  } catch (err) {
    console.error(err);
    return [];
  }
};
