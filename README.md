# What to wear
This is my take on the "weather-app-to-show-I-can-use-API's" with a practical twist. Instead of just showing numbers, it translates weather data into actionable clothing advice. 


### Overview
The app displays current weather, daily temperature evolution, and suggests what to wear depending on the felt temperature. The default setting is in Celsius but there is an option to choose Fahrenheit. Because sometimes "18°C" doesn't tell you if you need a jacket. 

Live Demo: [What to wear]()


### Why?
The idea originated from my difficulty to decide what to wear each day and the fact that temperatures are quite cryptic to me. I wanted to facilitate the choosing process by putting all the info in the same place. Furthermore, as I take health seriously, I added elements like sun protection, a water bottle and an umbrella.


### Ideal user
Anyone in the world of any gender who wants to quickly know what to wear right now and how the temperature will evolve during the day.
The design should be clear and not include the overwhelming information you can find on weather websites. The website should be mobile friendly as it would be the primary access. The felt temperature should be used for the recommendations.

Main idea: Make it simple and unisex for people who want to make fewer decisions.


## The code

### What went right
- This project became more complex while working on it and evolved a lot during its development. I did market research and I am quite satisfied with how much info I was able to add and the design of the website compared to the competitors. 
- I was able to cut my JavaScript file into parts depending on their use and imported/exported functions.
- While this website is not fully accessibly-friendly (mostly because of the colors used) I thought about it and incorporated labels for every element. That's also why the Fahrenheit option can be chosen using a checkbox.
- Being able to reach two API endpoints (geolocalisation and weather) and then work out a clothing logic.
- I learned what Prettier is and used the VS extension for it as I thought creating files for it would be overkill for a project of this size. 


### What were the challenges? 
- To be able to deploy the project on Vercel, I would have to use Node.js to use my API key with gitignore. I haven't learned backend technology yet so I had to put the API key in my script (I know, I know). On the other hand, I restricted the use of it on OpenWeather.
- I put an API limit per user but without session storage it is incomplete. 


### Future features? 
- User side of the error messages.
- History of the last searched locations.
- More explanations (the felt temperature is used for the day temperatures).
- Help section with photos of outfits for ideas (can be extended to user-imported ones if there is backend and authentication).
- Personalization by the user of what to wear at what temperature (a different storage method is needed).


### Lessons for next time
It is hard to have the motivation and stamina to finish a personal project; furthermore, it won't be like my first idea. And that's ok, I am still learning.

I used a few of my previous project (Pixel Pomo) lessons. I commmitted more often, I cut the JavaScript into parts, kept in mind accessibility and often tested my app. 
During my next project, I'll try to use TypeScript, Sass and a better debugging logic. Later in the game, I hope to use ESLint and finally build in React.


### Final Notes?
It was a fun project! I use it every day and I hope it will be useful to others too!


*Copyright: Weather Data from [OpenWeather API](https://openweathermap.org/api "Documentation officielle"). Attribution of the images used are in the HTML file.*