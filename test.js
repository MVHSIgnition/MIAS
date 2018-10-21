"keywords": [
			{
				"keyword": "senate majority leader mitch mcconnell"
			},
			{
				"keyword": "mcconnell"
			},
			{
				"keyword": "diner"
			},
			{
				"keyword": "restaurant friday night"
			},
			{
				"keyword": "transportation secretary elaine chao"
			},
			{
				"keyword": "social security"
			},
			{
				"keyword": "restaurant"
			},
			{
				"keyword": "small group"
			},
			{
				"keyword": "protester"
			},
			{
				"keyword": "angry"
			}
		]
	}

  {
"dialog":
{
    "trunks":[
    {
        "trunk_id" : "1",
        "message": "This is just a JSON Test"
    },
    {
        "trunk_id" : "2",
        "message": "This is a test of a bit longer text. Hopefully this will at the very least create 3 lines and trigger us to go on to another box. So we can test multi-box functionality, too."
    }
    ]
}
}
  var totalMessages = keywords.length;
  var keywords = ""

  for ( var i = 0; i < totalMessages; i++)
    {
    if !(/^\s+$/.test(myString))
		{
  			keywords += keyword + "%20AND%20"
		}

  }

	var lastIndex = keywords.lastIndexOf("%20AND%");

	keywords = keywords.substring(0, lastIndex);
