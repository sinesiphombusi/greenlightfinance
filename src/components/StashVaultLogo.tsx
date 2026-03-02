import stashvaultLogo from "@/assets/stashvault-logo.png";

interface StashVaultLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-8 h-8",
  md: "w-9 h-9",
  lg: "w-14 h-14",
};

const StashVaultLogo = ({ size = "md", className = "" }: StashVaultLogoProps) => (
  <div
    className={`${sizeMap[size]} rounded-lg bg-primary flex items-center justify-center overflow-hidden ${className}`}
  >
    <img
      src={stashvaultLogo}
      alt="StashVault logo"
      className="w-[75%] h-[75%] object-contain"
    />
  </div>
);

export default StashVaultLogo;
