## The Weather App

24/3/2023 - initial notes

**Features:**

- simple ui
- search with city name and investigate how to use user location (might not be easy, implement last)
- relatively simple app but still use MVC to maintain structure and maintainability for future features
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
