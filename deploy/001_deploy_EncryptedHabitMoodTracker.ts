import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("Deploying EncryptedHabitMoodTracker...");
  console.log("Deployer address:", deployer);

  const deployment = await deploy("EncryptedHabitMoodTracker", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 1,
  });

  console.log("EncryptedHabitMoodTracker deployed to:", deployment.address);

  // Verify deployment on non-local networks
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: deployment.address,
        constructorArguments: [],
      });
      console.log("Contract verified successfully");
    } catch (error) {
      console.log("Contract verification failed:", error);
    }
  }

  // Log deployment summary
  const contract = await ethers.getContractAt("EncryptedHabitMoodTracker", deployment.address);
  console.log("\nDeployment Summary:");
  console.log("- Contract Address:", deployment.address);
  console.log("- Deployer:", deployer);
  console.log("- Network:", hre.network.name);
  console.log("- Gas Used:", deployment.receipt?.gasUsed?.toString());
};

func.tags = ["EncryptedHabitMoodTracker"];
export default func;

