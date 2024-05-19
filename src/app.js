import { privateKeyToAccount } from "viem/accounts";
import { init } from "./utils/index.js";
import { deployContract } from "./deploy.js";
import { readAllFunctionsWithArgsIn } from "./read.js";
import { writeContract } from "./write.js";
import { PRIVATE_KEY } from "./config/index.js";
import { abi, byteCode } from "./contract.js";

async function main() {
  try {
    const account = privateKeyToAccount(`0x${PRIVATE_KEY}`);

    const { walletClient, publicClient } = init({ account });

    // CONTRACT DEPLOYMENT
    console.log("Deploying the contract using ABI and byteCode");
    const { hash: contractDeploymentHash, contractAddress } =
      await deployContract({
        walletClient,
        publicClient,
        abi,
        byteCode,
        args: [0],
      });
    console.log(`Deployment hash: ${contractDeploymentHash}`);
    console.log(`Contract address: ${contractAddress}`);

    // READ FROM CONTRACT (only functions without args)
    console.log("Reading from the contract");
    const read = await readAllFunctionsWithArgsIn({
      publicClient,
      contractAddress,
      abi,
    });
    console.log(read);

    // WRITE TO CONTRACT
    console.log("Writing to the contract");
    const write = await writeContract({
      abi,
      walletClient,
      publicClient,
      contractAddress,
      functionName: "increment", // Update the function name as per your contract
    });
    console.log(`Write complete: ${write}`);

    // READ FROM CONTRACT AGAIN
    console.log("Reading from the contract");
    const read2 = await readAllFunctionsWithArgsIn({
      publicClient,
      contractAddress,
      abi,
    });
    console.log(read2);
  } catch (error) {
    console.error("Error in main execution:", error);
  }
}

main();
