
# Slash Commands
## When executed in a guild
```js
{
  app_permissions: '562949953863680',
  application_id: '1360871728770846733',
  attachment_size_limit: 10485760,
  authorizing_integration_owners: { '1': '1034315047838687264' },
  channel: {
    flags: 0,
    guild_id: '1345046958481346613',
    id: '1345046959593095214',
    last_message_id: '1418570862290014208',
    name: '🎓・lonely',
    nsfw: false,
    parent_id: '1345046959593095213',
    permissions: '9007199254740991',
    position: 9,
    rate_limit_per_user: 0,
    topic: null,
    type: 0
  },
  channel_id: '1345046959593095214',
  context: 0,
  data: {
    id: '1409514738479665317',
    name: 'echo',
    options: [ [Object] ],
    type: 1
  },
  entitlement_sku_ids: [],
  entitlements: [],
  guild: {
    features: [ 'NEWS', 'COMMUNITY', 'AUTO_MODERATION', 'SOUNDBOARD' ],
    id: '1345046958481346613',
    locale: 'en-US'
  },
  guild_id: '1345046958481346613',
  guild_locale: 'en-US',
  id: '1418572602737299559',
  locale: 'en-US',
  member: {
    avatar: null,
    banner: null,
    collectibles: null,
    communication_disabled_until: null,
    deaf: false,
    flags: 0,
    joined_at: '2025-02-28T14:56:24.701000+00:00',
    mute: false,
    nick: 'Cube Nerd',
    pending: false,
    permissions: '9007199254740991',
    premium_since: null,
    roles: [ '1345046958481346619', '1355389599949525134' ],
    unusual_dm_activity_until: null,
    user: {
      avatar: '0c901cb92b1ff3d05fc8dac514ee60eb',
      avatar_decoration_data: null,
      clan: [Object],
      collectibles: null,
      discriminator: '0',
      display_name_styles: null,
      global_name: 'Cube Nerd',
      id: '1034315047838687264',
      primary_guild: [Object],
      public_flags: 256,
      username: 'mastercuber55'
    }
  },
  token: '',
  type: 2,
  version: 1
}
```
## When executed in a DM
```js
{
  app_permissions: '562949953601536',
  application_id: '1360871728770846733',
  attachment_size_limit: 10485760,
  authorizing_integration_owners: { '1': '1034315047838687264' },
  channel: {
    flags: 0,
    id: '1374993866163355690',
    last_message_id: '1418566852732256386',
    recipient_flags: 0,
    recipients: [ [Object] ],
    type: 1
  },
  channel_id: '1374993866163355690',
  context: 2,
  data: {
    id: '1409514738479665317',
    name: 'echo',
    options: [ [Object] ],
    type: 1
  },
  entitlements: [],
  id: '1418573293438505022',
  locale: 'en-US',
  token: '',
  type: 2,
  user: {
    avatar: '0c901cb92b1ff3d05fc8dac514ee60eb',
    avatar_decoration_data: null,
    clan: {
      badge: '736e7d8bb18ed68b6e0223765e79015e',
      identity_enabled: true,
      identity_guild_id: '806219938943074375',
      tag: 'FISH'
    },
    collectibles: null,
    discriminator: '0',
    display_name_styles: null,
    global_name: 'Cube Nerd',
    id: '1034315047838687264',
    primary_guild: {
      badge: '736e7d8bb18ed68b6e0223765e79015e',
      identity_enabled: true,
      identity_guild_id: '806219938943074375',
      tag: 'FISH'
    },
    public_flags: 256,
    username: 'mastercuber55'
  },
  version: 1
}
```
# Buttons
# When in a DM
```js
{
  app_permissions: '562949953601536',
  application_id: '1360871728770846733',
  attachment_size_limit: 10485760,
  authorizing_integration_owners: { '1': '1034315047838687264' },
  channel: {
    flags: 0,
    id: '1374993866163355690',
    last_message_id: '1418959825731059732',
    recipient_flags: 0,
    recipients: [ [Object] ],
    type: 1
  },
  channel_id: '1374993866163355690',
  context: 2,
  data: { component_type: 2, custom_id: '1374966298823360614', id: 3 },
  entitlements: [],
  id: '1418960457426931944',
  locale: 'en-US',
  message: {
    application_id: '1360871728770846733',
    attachments: [],
    author: {
      avatar: '6df4c1ae811ac840cdd40cbb560c59f4',
      avatar_decoration_data: null,
      bot: true,
      clan: null,
      collectibles: null,
      discriminator: '2970',
      display_name_styles: null,
      global_name: null,
      id: '1360871728770846733',
      primary_guild: null,
      public_flags: 524288,
      username: 'Fischl'
    },
    channel_id: '1374993866163355690',
    components: [ [Object] ],
    content: '<@1374966298823360614>!!',
    edited_timestamp: null,
    embeds: [ [Object] ],
    flags: 0,
    id: '1418959825731059732',
    interaction: {
      id: '1418959816092549180',
      name: 'connect4',
      type: 2,
      user: [Object]
    },
    interaction_metadata: {
      authorizing_integration_owners: [Object],
      command_type: 1,
      id: '1418959816092549180',
      name: 'connect4',
      type: 2,
      user: [Object]
    },
    mention_everyone: false,
    mention_roles: [],
    mentions: [ [Object] ],
    pinned: false,
    position: 0,
    timestamp: '2025-09-20T13:59:45.453000+00:00',
    tts: false,
    type: 20,
    webhook_id: '1360871728770846733'
  },
  token: '',
  type: 3,
  user: {
    avatar: 'd6844110d291353e8efbb31e47da6412',
    avatar_decoration_data: null,
    clan: {
      badge: '736e7d8bb18ed68b6e0223765e79015e',
      identity_enabled: true,
      identity_guild_id: '806219938943074375',
      tag: 'FISH'
    },
    collectibles: null,
    discriminator: '0',
    display_name_styles: null,
    global_name: 'Cube Nerd',
    id: '1034315047838687264',
    primary_guild: {
      badge: '736e7d8bb18ed68b6e0223765e79015e',
      identity_enabled: true,
      identity_guild_id: '806219938943074375',
      tag: 'FISH'
    },
    public_flags: 256,
    username: 'mastercuber55'
  },
  version: 1
}
```