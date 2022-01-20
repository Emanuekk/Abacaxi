module.exports = {
    app: {
        px: '$',
    },

    opt: {
        maxVol: 27,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
