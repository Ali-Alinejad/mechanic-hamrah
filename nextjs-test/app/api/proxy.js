// api/proxy.js
import axios from "axios";

export default async (req, res) => {
  const { term, lat, lng } = req.query;
  try {
    const response = await axios.get("https://api.neshan.org/v1/search", {
      params: { term, lat, lng },
      headers: {
        Authorization: `web.e27fb33bea394b0c81f058ad18481f53`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
