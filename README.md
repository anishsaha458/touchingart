Endpoint: https://api.artic.edu/api/v1/artworks

Request: https://api.artic.edu/api/v1/artworks/search?q=monet

Response:
example:
 {
  "data": [
    {
      "id": 16568,
      "title": "Water Lilies",
      "artist_title": "Claude Monet",
      "date_display": "1906"
    }
  ],
  "pagination": {
    "total": 123,
    "limit": 10,
    "offset": 0
  }
}


JSON:

Example:
"title": "The Bedroom"
"artist_title": "Vincent van Gogh"
"medium_display": "Oil on canvas"

API Key: not necessary for the AIC API

Rate Limit: The API is generous

Query Parameter: used for searching, filtering, pagination, field selection
Example : https://api.artic.edu/api/v1/artworks/search?q=van+gogh&limit=5

REST: example: GET /api/v1/artworks/27992

Wrappers: For the AIC API, there is no official wrapper 


