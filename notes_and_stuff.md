## The Weather App

28/3/2023

Realised that all the previous trouble was cause weatherAPI is bit crap, when it comes to
special characters. So I needed a function that replaces single characters when looping
over the string, after it's been split to an array. Clumsy but hey, it works.

27/3/2023

Basic functionality is completed, tho the code is ugly as sin. I have trouble with encodeURI(),
which by all accounts should be able to encode location names with special charachters (äöå) to
a format that can be sent as a fetch request but it doesn't do it.

24/3/2023 - initial notes

**Features:**

- simple ui
- search with city name and investigate how to use user location (might not be easy, implement last)
- relatively simple app but still use MVC to maintain structure and maintainability for future features (basically abandoned later on)
- find some icons or something to represent weather visually
- (possibly) see how to have a changing background image based on location or/and weather

**Implementation**

Start with building the API fetching in console / text to almost blank HTML (model)
Hardcode HTML proper (view)
Build a controller that directs actions and calls model (controller)
Plan & build UI elements

Icons from https://bas.dev/work/meteocons

Scaled back from using MVC, was having problems with using async functions across files in the way
I had set that up. Now api.js does the fetching and feeds the information to dom.js for use in
UI. Maybe not ideal but it works.

Next: make conditions supplied by weatherAPI match with Meteocon icons.
