export async function readAllFunctionsWithArgsIn({
  publicClient,
  contractAddress,
  abi,
}) {
  let readFunction = [];
  for (const a of abi) {
    if (a.stateMutability === "view" && a.inputs.length === 0) {
      try {
        let value = await publicClient.readContract({
          abi,
          address: contractAddress,
          functionName: a.name,
        });
        readFunction.push({ [a.name]: value });
      } catch (error) {
        console.error(`Error reading function ${a.name}:`, error);
      }
    }
  }
  return readFunction;
}
