import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Candidate {
  id: string;
  name: string;
  party: string;
  description: string;
}

export const Vote = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<string>('');
  const [isVoting, setIsVoting] = useState(false);
  const [voteComplete, setVoteComplete] = useState(false);

  const candidates: Candidate[] = [
    {
      id: 'candidate1',
      name: 'Alice Chen',
      party: 'Digital Democratic Party',
      description: 'Advocate for blockchain transparency and digital rights'
    },
    {
      id: 'candidate2', 
      name: 'Bob Matrix',
      party: 'Cybersecurity Alliance',
      description: 'Expert in decentralized systems and privacy protection'
    },
    {
      id: 'candidate3',
      name: 'Carol Cipher',
      party: 'Future Tech Coalition', 
      description: 'Pioneer in quantum-resistant cryptography'
    },
    {
      id: 'candidate4',
      name: 'David Protocol',
      party: 'Open Source Movement',
      description: 'Champion of distributed governance and transparency'
    }
  ];

  const encryptVote = async (candidateId: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(candidateId);
    
    // Generate a random key for AES-GCM encryption
    const key = await crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
    
    // Generate random IV
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Encrypt the vote
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      data
    );
    
    // Convert to base64 for storage
    const encryptedArray = new Uint8Array(encrypted);
    const encryptedBase64 = btoa(String.fromCharCode(...encryptedArray));
    
    return encryptedBase64;
  };

  const submitVote = async () => {
    if (!selectedCandidate) {
      toast.error('Please select a candidate');
      return;
    }

    setIsVoting(true);

    try {
      // Encrypt the vote client-side
      const encryptedVote = await encryptVote(selectedCandidate);
      
      // Simulate blockchain submission delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock IPFS upload
      const ipfsHash = `Qm${Math.random().toString(36).substring(2, 15)}`;
      
      toast.success('Vote cast successfully!', {
        description: `Your encrypted vote has been recorded. IPFS Hash: ${ipfsHash.slice(0, 10)}...`
      });
      
      setVoteComplete(true);
    } catch (error) {
      toast.error('Failed to cast vote. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };

  if (voteComplete) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <Card className="matrix-terminal max-w-2xl w-full">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-6 animate-matrix-glow">✓</div>
            <h1 className="text-4xl font-bold matrix-text mb-4 animate-digital-form">
              VOTE RECORDED
            </h1>
            <p className="text-matrix-glow text-lg mb-8">
              Your encrypted vote has been securely submitted to the blockchain.
            </p>
            <div className="space-y-4 text-sm matrix-text">
              <div className="p-4 bg-primary/10 rounded border border-primary/30">
                <div className="font-mono text-xs space-y-1">
                  <div>&gt; Vote encrypted with AES-256-GCM</div>
                  <div>&gt; Submitted to IPFS distributed storage</div>
                  <div>&gt; Blockchain commitment recorded</div>
                  <div>&gt; Voter token burned (preventing double voting)</div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button 
                onClick={() => window.location.href = '/verify'}
                className="matrix-button"
              >
                &gt; Verify Vote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold matrix-text mb-4">
            <span className="animate-digital-form">CAST YOUR VOTE</span>
          </h1>
          <p className="text-matrix-glow text-lg">
            Select your candidate. Your vote will be encrypted and secured on-chain.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Candidate Selection */}
          <div className="lg:col-span-2">
            <Card className="matrix-terminal">
              <CardHeader>
                <CardTitle className="matrix-text">
                  <span className="text-matrix-bright mr-2">&gt;</span>
                  Select Candidate
                </CardTitle>
                <CardDescription className="text-matrix-glow">
                  Choose your preferred candidate for the election
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={selectedCandidate} 
                  onValueChange={setSelectedCandidate}
                  className="space-y-4"
                >
                  {candidates.map((candidate) => (
                    <div 
                      key={candidate.id}
                      className="flex items-start space-x-3 p-4 rounded border border-primary/20 hover:border-primary/50 transition-colors hover:bg-primary/5"
                    >
                      <RadioGroupItem 
                        value={candidate.id} 
                        id={candidate.id}
                        className="mt-1"
                      />
                      <Label 
                        htmlFor={candidate.id}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="matrix-text">
                          <div className="font-semibold text-lg text-matrix-bright">
                            {candidate.name}
                          </div>
                          <div className="text-matrix-neon text-sm font-medium mb-2">
                            {candidate.party}
                          </div>
                          <div className="text-matrix-glow text-sm">
                            {candidate.description}
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="mt-8">
                  {isVoting ? (
                    <div className="text-center py-8">
                      <div className="animate-glitch text-2xl matrix-text mb-4">
                        PROCESSING VOTE...
                      </div>
                      <div className="space-y-2 font-mono text-sm text-matrix-glow">
                        <div className="animate-pulse">&gt; Encrypting vote data...</div>
                        <div className="animate-pulse">&gt; Generating proof of vote...</div>
                        <div className="animate-pulse">&gt; Submitting to blockchain...</div>
                        <div className="animate-pulse">&gt; Burning voter token...</div>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      onClick={submitVote}
                      disabled={!selectedCandidate}
                      className="matrix-button w-full text-lg py-6"
                    >
                      &gt; CAST ENCRYPTED VOTE
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vote Security Info */}
          <div className="space-y-6">
            <Card className="matrix-terminal">
              <CardHeader>
                <CardTitle className="matrix-text text-lg">
                  <span className="text-matrix-bright mr-2">&gt;</span>
                  Vote Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="space-y-3 text-matrix-glow">
                  <div>
                    <div className="font-semibold text-matrix-bright">🔒 Client-Side Encryption</div>
                    <div>Your vote is encrypted in your browser using AES-256-GCM</div>
                  </div>
                  
                  <div>
                    <div className="font-semibold text-matrix-bright">🌐 IPFS Storage</div>
                    <div>Encrypted votes stored on decentralized IPFS network</div>
                  </div>
                  
                  <div>
                    <div className="font-semibold text-matrix-bright">⛓️ Blockchain Proof</div>
                    <div>Immutable commitment recorded on blockchain</div>
                  </div>
                  
                  <div>
                    <div className="font-semibold text-matrix-bright">🔥 Token Burn</div>
                    <div>Voter token destroyed after use prevents double voting</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="matrix-terminal">
              <CardHeader>
                <CardTitle className="matrix-text text-lg">
                  <span className="text-matrix-bright mr-2">&gt;</span>
                  Vote Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="font-mono text-matrix-glow">
                  <div>&gt; Voter registration: ✓ Verified</div>
                  <div>&gt; Token status: ✓ Active</div>
                  <div>&gt; Encryption ready: ✓ AES-256-GCM</div>
                  <div>&gt; Blockchain connected: ✓ Online</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};