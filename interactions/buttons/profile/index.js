import { InteractionResponseType, TextInputStyle } from "discord-api-types/v10"
import { LabelBuilder, ModalBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, TextInputBuilder } from "@discordjs/builders"
/** 
 * @param {object} ctx
 * @param {import("discord-api-types/v10").APIUser} ctx.user 
 * @param {Array} ctx.args 
 * @param {import("discord-api-types/v10").APIMessage} ctx.message
*/
export default async ({ user, args, message }) => {
    if (user.id != args[1]) 
        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: "Thou lack the authority for execution of tis' interaction.",
                flags: 64
            },
        }

    const modal = new ModalBuilder()
        .setTitle("Customize Your Profile <3")
        .setCustomId("modal")
        .addLabelComponents(
            new LabelBuilder()
                .setLabel("Text Input")
                .setDescription("Custom Description")
                .setTextInputComponent(
                    new TextInputBuilder()
                        .setCustomId("description")
                        .setStyle(TextInputStyle.Paragraph)
                        .setMaxLength(200)
                        .setRequired(false)
                )
        )
        .addLabelComponents(
            new LabelBuilder()
                .setLabel("Set Status")
                .setTextInputComponent(
                    new TextInputBuilder()
                        .setCustomId("status")
                        .setStyle(TextInputStyle.Paragraph)
                        .setPlaceholder("The brave wanderer continues their sojourn through unknown lands…")
                        .setMaxLength(200)
                        .setRequired(false)
                )
        )
        .addLabelComponents(
            new LabelBuilder()
                .setLabel("Show your profile icon?")
                .setStringSelectMenuComponent(
                    new StringSelectMenuBuilder()
                        .setCustomId("icon")
                        .addOptions(
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Yes")
                                .setValue("yes")
                                .setEmoji({ name: "✅" })
                                .setDefault(true),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("No")
                                .setValue("no")
                                .setEmoji({ name: "❌" })
                        )
                )
        )

    return {
        type: InteractionResponseType.Modal,
        data: modal
    };

}