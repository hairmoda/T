import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const NFTViewer = dynamic(() => import("@/components/NFTViewer"), { ssr: false });

const CONTRACT_ADDRESS = "0x636d2DdCA03aBE16698AB3954A9A84a0bAc506D2";
const ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)"
];

export default function MyNFTs() {
  const { address } = useAccount();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!address) return;
      setLoading(true);
      try {
        const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/YOUR_INFURA_KEY");
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        const balance = await contract.balanceOf(address);

        const nftPromises = Array.from({ length: balance.toNumber() }, async (_, i) => {
          const tokenId = await contract.tokenOfOwnerByIndex(address, i);
          const tokenURI = await contract.tokenURI(tokenId);
          const response = await fetch(tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/"));
          const metadata = await response.json();
          return {
            tokenId: tokenId.toString(),
            ...metadata
          };
        });

        const nftData = await Promise.all(nftPromises);
        setNfts(nftData);
      } catch (err) {
        console.error("Error fetching NFTs:", err);
      }
      setLoading(false);
    };

    fetchNFTs();
  }, [address]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🎨 My NFTs</h1>
      {loading ? (
        <div className="flex items-center space-x-2 text-lg">
          <Loader2 className="animate-spin" />
          <span>Loading NFTs from Sepolia...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nfts.map((nft, idx) => (
            <Card key={idx} className="p-4">
              <h2 className="text-xl font-semibold mb-2">{nft.name}</h2>
              {nft.animation_url && (
                <NFTViewer glbUrl={nft.animation_url} />
              )}
              <CardContent className="mt-4 space-y-2">
                <p><strong>XP:</strong> {nft.dna?.xp}</p>
                <p><strong>Energy:</strong> {nft.dna?.energy}</p>
                <p><strong>Skill:</strong> {nft.dna?.skill}</p>
                <p><strong>Kindness:</strong> {nft.dna?.kindness}</p>
                <Button className="w-full mt-2">💬 ابدأ الحديث</Button>
                <div className="flex justify-between pt-4">
                  <Button variant="outline">Mint</Button>
                  <Button variant="outline">Stake</Button>
                  <Button variant="outline">Evolve</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}