module.exports = {
    apps: [
        {
            name: "server",
            script: "deno",
            automation: false,
            args: "run --allow-net --allow-read --allow-write --unstable ./example/server.ts",
            watch: ["./src", "./example"],
            ignore_watch: ["./example/database.json", "./.git", "./.vscode", "./**/*.d.ts"],
            restart_delay: 500,
        },
    ],
};
