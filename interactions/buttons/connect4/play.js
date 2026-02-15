import { InteractionResponseType } from "discord-api-types/v10"
import DCutils from "../../../handlers/DCutils.js";

const insert = (column, data, block) => {
  for (let row = data.length - 1; row > 0; row--) { // bottom to up
    const rowArr = [...data[row]]; // This ensures emojis are properly divided since emojis can take up more space than one
    if (rowArr[column] === '⬛') {
      rowArr[column] = block;          // place block here
      data[row] = rowArr.join('');
      return [data, row];
    }
  }
  
  return [data, -1];
};


const checkWinner = (data, row, col) => {
    
  const board = data.map(row => [...row]);
  
  const directions = [
      [0, 1],   // horizontal
      [1, 0],   // vertical
      [1, 1],   // diagonal down right
      [1, -1],  // diagonal down left
  ];
  const target = board[row][col];
  if (target === "⬛") return false;

  for (const [dr, dc] of directions) {
      let count = 1;
      for (let d = 1; d < 4; ++d) { // check positive direction
          const r = row + dr * d, c = col + dc * d;
          if (r < 0 || c < 0 || r >= board.length || c >= board[0].length) break;
          if (board[r][c] !== target) break;
          count++;
      }
      for (let d = 1; d < 4; ++d) { // check negative direction
          const r = row - dr * d, c = col - dc * d;
          if (r < 0 || c < 0 || r >= board.length || c >= board[0].length) break;
          if (board[r][c] !== target) break;
          count++;
      }
      if (count >= 4) return true;
  }
  return false;
}

export default async({ args, message, user }) => {

    const player = user.id
    const host = args[2]
    const friend = args[3]
    const embed = message.embeds[0]
    let { components } = message
    const column = parseInt(args[4], 10);
    let turn = embed.fields[0].value.replace("<@", "").replace(">", "")

    

    if(turn != player) {
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: `Its not your turn!!! 👎`,
          flags: 64
        }
      }
    }

    if(args[4] == "resign") {
      embed.fields[0].name = `👑 Winner`
      components = DCutils.disableComponents(components)

      if(turn == host) 
        turn = friend;
      else 
        turn = host

      embed.fields[0].value = `<@${turn}> as ${embed.fields[0].value} ran away 🏃🥀.`

      return {
        type: InteractionResponseType.UpdateMessage,
        data: {
            embeds: [embed],
            components
        }
    }
    }

    let data = embed.description.split("\n")
    
    const [newData, row] = insert(column, data, player == host ? "🟩" : "🟥")
    data = newData

    if(row == "-1") {
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: `Where are you even trying to put it 😭.`,
          flags: 64
        }
      }
    }

    embed.description = data.join("\n")

    if(checkWinner(data, row, column)) {
      components = DCutils.disableComponents(components)
      embed.fields[0].name = `👑 Winner`
    } else {
      if(turn == host) 
        turn = friend;
      else 
        turn = host
    }

    embed.fields[0].value = `<@${turn}>`

    return {
        type: InteractionResponseType.UpdateMessage,
        data: {
            embeds: [embed],
            components
        }
    }

}