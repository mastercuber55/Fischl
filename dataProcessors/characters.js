// Sole purpose is to obtain data from https://gsi.fly.dev/characters and to process it
import fs from "fs"

const byRarity = {
	5: [],
	4: []
}

const byName = {

}

function writeData(fileName, data) {
	fs.writeFileSync("./genshinData/characters/" + fileName, JSON.stringify(data, null, 2), "utf8")
}

async function getCharacters() {
	const res = await fetch("https://raw.githubusercontent.com/tokafew420/genshin-impact-tools/refs/heads/main/data/characters.json")
	const data = await res.json()


	console.log(data)
	// for(const character of data.results) {
	// 	character.rarity = Number(character.rarity[0])

	// 	byRarity[character.rarity].push(character.name)
	// 	byName[character.name] = character
	// }

	// writeData("rarity.json", byRarity)
	// writeData("name.json", byName)


}

getCharacters()