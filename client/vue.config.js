module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `
            @import "@/scss/setup/_variables.scss";
            @import "@/scss/setup/_typography.scss";
          `
            }
        }
    }
};