require('package-script').spawn([
    {
        command: "npm",
        args: ["install", "-g", "npm-check-updates"]
    },
    {
        command: "npm",
        args: ["install", "-g", "istanbul"]
    },
    {
        command: "npm",
        args: ["install", "-g", "grunt-cli"]
    },
    {
        command: "npm",
        args: ["install", "-g", "mocha-phantomjs"]
    }
]);
