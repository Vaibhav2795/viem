export async function deployContract({
  walletClient,
  publicClient,
  abi,
  byteCode,
  args,
}) {
  try {
    const hash = await walletClient.deployContract({
      abi,
      bytecode: `0x${byteCode}`,
      args,
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    const contractAddress = receipt.contractAddress;
    return { hash, contractAddress };
  } catch (error) {
    console.error("Error deploying contract:", error);
    throw error;
  }
}
