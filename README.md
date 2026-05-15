# inst377_final
Final project for INST377 class.

# History Explorer
Description: A full-stack app that allows you to search through collections drawn from the major museums and galleries across Europe through Europeana's search and record APIs.  
Description of target browsers: Google Chrome  
Link to Developer Manual: https://europeana.atlassian.net/wiki/spaces/EF/pages/2461270026/API+Suite

# Docs: Developer Manual

## How to install 
Git clone the repository's url to install History Explorer.  
Make sure to have an .env file with your Supabuse url, Supabase key, and Europeana key. 

### Dependencies
- Node.js
- npm
- Git
- @supabase/supabase-js
- body-parser
- cors
- dotenv
- express
- nodemon

### Supabase database
On Supabase, create a search_history table with the following columns:
- id (int8)
- search_term (text)
- created_at (timestamptz)

## How to run
Write "npm start" in your terminal.
The server runs on http://localhost:3000

## How to run tests
Write "npm test" in your terminal.

## API Documentation

### GET /api/search
This searches Europeana for historical artifacts.

Example GET request:
http://localhost:3000/api/search?q=vermeer

Example response:
```
"items": [
		{
			"completeness": 10,
			"country": [
				"Austria"
			],
			"dataProvider": [
				"Fine Arts Museum Vienna"
			],
			"dcCreator": [
				"http://d-nb.info/118626590",
				"Johannes Vermeer van Delft (Künstler/in)"
			],
			"dcCreatorLangAware": {
				"de": [
					"Johannes Vermeer van Delft (Künstler/in)"
				],
				"def": [
					"http://d-nb.info/118626590"
				]
			},
			"dcDescription": [
```

### GET /search-history
This returns the search terms that are stored in the Supabase database.

Example GET request:
http://localhost:3000/search-history

Example response:
```
{
		"id": 13,
		"search_term": "vermeer",
		"created_at": "2026-05-15T03:13:42.288613+00:00"
	},
```

### POST /search-history
This stores the search term in the Supabase database.

Example request:
```
{
  "search_term": "vermeer"
}
```
Example response:
```
[
	{
		"id": 14,
		"search_term": "vermeer",
		"created_at": "2026-05-15T21:31:53.692924+00:00"
	}
]
```
## Bugs
Sometimes Europeana items don't have images, creator information, or complete metadata.
This is especially obvious on the Random Artfiact page.

## Future Development
History Explorer can have more robust searching through the addition of filtering (by type, creator, year, etc.) on the Home page. 