import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from "openai";

const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
    const {lon, lat} = await request.json()

    if (!lon || !lat) {
        return NextResponse.json({ error: "No lon or lat provided"})
    }

    const geoNamesRes = await fetch(
        `http://api.geonames.org/citiesJSON?north=${lat+1}&south=${lat-1}&east=${lon+1}&west=${lon-1}&lang=en&maxRows=20&username=${GEONAMES_USERNAME}`
    )

    const data = await geoNamesRes.json()
    if (data && data.geonames && data.geonames.length > 0) {
        const largeCities = data.geonames.filter((city: any) => city.population > 100000).sort((a: any, b: any) => b.population - a.population)
        if (largeCities.length > 0) {
            const city = largeCities[0]["name"] + ", " + largeCities[0]["countrycode"]
            const story = await generateStory(city)
            if (!story) {
                return NextResponse.json({ error: "No story generated"})
            }
            const return_response = {
                city: city,
                story: story
            }
            return NextResponse.json(return_response)
        } else {
            return NextResponse.json({ error: "No large cities found"})
        }
    } else {
        return NextResponse.json({ error: "No cities found"})
    }
}

const generateStory = async (city: String) => {
    const system = `You are BourdainGPT. The user will provide a message about ${city}, and you will respond with a three paragraph response about that city. In particular, the first paragraph will give a short summary about the city, its culture, environment and history. The next two paragraphs will be about the culinary traditions of the city, with specific examples of dishes, ingredients and festivities. Try to keep each response brief (1 sentences for first paragraph, ~3 sentences per paragraph) but informative and colorful.`
    const user = `Give me brief but informative description of ${city} (the second term is its country code not state) and its culinary tradition. Keep each paragraph to 1-3 sentences.`
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "system", content: system},
        {role: "user", content: user}],
      });
    return chatCompletion.data.choices[0].message?.content
}