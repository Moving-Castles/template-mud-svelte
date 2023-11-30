import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
    deploysDirectory: "./deploys",
    tables: {
        Name: "string",
        Counter: "uint32",
        GameConfig: {
            keySchema: {},
            valueSchema: {
                increment: "uint32"
            },
            dataStruct: true,
        },
    }
});
