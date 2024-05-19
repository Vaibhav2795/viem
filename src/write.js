export async function writeContract({
  abi,
  walletClient,
  publicClient,
  contractAddress,
  functionName,
  args,
}) {
  const config = {
    abi,
    address: contractAddress,
    functionName,
  };
  if (args) {
    config.args = args;
  }

  try {
    const counterHash = await walletClient.writeContract(config);
    await publicClient.waitForTransactionReceipt({ hash: counterHash });
    return counterHash;
  } catch (error) {
    console.error(`Error writing function ${functionName}:`, error);
    throw error;
  }
}
