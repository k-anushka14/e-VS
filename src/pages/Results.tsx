import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface VoteResult {
  candidate: string;
  party: string;
  votes: number;
  percentage: number;
  color: string;
}

export const Results = () => {
  const [isDecrypting, setIsDecrypting] = useState(true);
  const [results, setResults] = useState<VoteResult[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [decryptionProgress, setDecryptionProgress] = useState(0);

  const mockResults: VoteResult[] = [
    { candidate: 'Alice Chen', party: 'Digital Democratic Party', votes: 4250, percentage: 42.5, color: '#00ff41' },
    { candidate: 'Bob Matrix', party: 'Cybersecurity Alliance', votes: 2890, percentage: 28.9, color: '#00cc33' },
    { candidate: 'Carol Cipher', party: 'Future Tech Coalition', votes: 1920, percentage: 19.2, color: '#008f11' },
    { candidate: 'David Protocol', party: 'Open Source Movement', votes: 940, percentage: 9.4, color: '#004d00' }
  ];

  useEffect(() => {
    const decryptVotes = async () => {
      // Simulate threshold decryption process
      const totalSteps = 100;
      
      for (let i = 0; i <= totalSteps; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setDecryptionProgress(i);
      }
      
      // Simulate final results compilation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResults(mockResults);
      setTotalVotes(mockResults.reduce((sum, result) => sum + result.votes, 0));
      setIsDecrypting(false);
    };

    decryptVotes();
  }, []);

  if (isDecrypting) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <Card className="matrix-terminal max-w-2xl w-full">
          <CardContent className="text-center py-12">
            <div className="text-4xl matrix-text mb-6 animate-glitch">
              DECRYPTING VOTES...
            </div>
            
            <div className="space-y-6">
              <Progress value={decryptionProgress} className="w-full" />
              
              <div className="space-y-2 font-mono text-sm text-matrix-glow">
                <div className={`transition-opacity ${decryptionProgress > 10 ? 'opacity-100' : 'opacity-50'}`}>
                  &gt; Collecting encrypted votes from IPFS...
                </div>
                <div className={`transition-opacity ${decryptionProgress > 30 ? 'opacity-100' : 'opacity-50'}`}>
                  &gt; Gathering decryption keys from nodes...
                </div>
                <div className={`transition-opacity ${decryptionProgress > 50 ? 'opacity-100' : 'opacity-50'}`}>
                  &gt; Performing threshold decryption...
                </div>
                <div className={`transition-opacity ${decryptionProgress > 70 ? 'opacity-100' : 'opacity-50'}`}>
                  &gt; Verifying vote integrity...
                </div>
                <div className={`transition-opacity ${decryptionProgress > 90 ? 'opacity-100' : 'opacity-50'}`}>
                  &gt; Compiling final results...
                </div>
              </div>
              
              <div className="text-matrix-bright font-mono">
                {decryptionProgress}% Complete
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold matrix-text mb-4">
            <span className="animate-digital-form">ELECTION RESULTS</span>
          </h1>
          <p className="text-matrix-glow text-lg">
            Decentralized vote counting completed. Results verified on blockchain.
          </p>
          <div className="mt-4 text-matrix-bright font-mono text-xl">
            Total Votes Cast: {totalVotes.toLocaleString()}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart */}
          <Card className="matrix-terminal">
            <CardHeader>
              <CardTitle className="matrix-text">
                <span className="text-matrix-bright mr-2">&gt;</span>
                Vote Distribution
              </CardTitle>
              <CardDescription className="text-matrix-glow">
                Votes per candidate (decrypted results)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={results}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 65, 0.2)" />
                  <XAxis 
                    dataKey="candidate" 
                    stroke="#00ff41"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#00ff41" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#000',
                      border: '1px solid #00ff41',
                      borderRadius: '8px',
                      color: '#00ff41'
                    }}
                  />
                  <Bar 
                    dataKey="votes" 
                    fill="#00ff41"
                    stroke="#00cc33"
                    strokeWidth={1}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="matrix-terminal">
            <CardHeader>
              <CardTitle className="matrix-text">
                <span className="text-matrix-bright mr-2">&gt;</span>
                Vote Percentage
              </CardTitle>
              <CardDescription className="text-matrix-glow">
                Percentage breakdown of all votes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={results}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="votes"
                  >
                    {results.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#000" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#000',
                      border: '1px solid #00ff41',
                      borderRadius: '8px',
                      color: '#00ff41'
                    }}
                    formatter={(value: any, name: any, props: any) => [
                      `${value} votes (${props.payload.percentage}%)`,
                      props.payload.candidate
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {results.map((result, index) => (
            <Card key={index} className="matrix-terminal">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="text-2xl font-bold matrix-text" style={{ color: result.color }}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold matrix-text text-lg">
                      {result.candidate}
                    </div>
                    <div className="text-matrix-glow text-sm">
                      {result.party}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold matrix-text" style={{ color: result.color }}>
                      {result.percentage}%
                    </div>
                    <div className="text-matrix-glow font-mono text-sm">
                      {result.votes.toLocaleString()} votes
                    </div>
                  </div>
                  <Progress 
                    value={result.percentage} 
                    className="w-full"
                    style={{ 
                      background: `linear-gradient(to right, ${result.color}, transparent)`
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Verification Info */}
        <Card className="matrix-terminal">
          <CardHeader>
            <CardTitle className="matrix-text">
              <span className="text-matrix-bright mr-2">&gt;</span>
              Result Verification
            </CardTitle>
            <CardDescription className="text-matrix-glow">
              Blockchain verification and transparency data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm">
                <div className="space-y-2 text-matrix-glow">
                  <div className="font-semibold text-matrix-bright">🔒 Cryptographic Verification</div>
                  <div className="font-mono text-xs space-y-1">
                    <div>&gt; All votes verified with zero-knowledge proofs</div>
                    <div>&gt; Threshold decryption completed successfully</div>
                    <div>&gt; No double-voting detected</div>
                    <div>&gt; Vote integrity: 100% verified</div>
                  </div>
                </div>
                
                <div className="space-y-2 text-matrix-glow">
                  <div className="font-semibold text-matrix-bright">⛓️ Blockchain Data</div>
                  <div className="font-mono text-xs space-y-1">
                    <div>&gt; Block height: 2,847,392</div>
                    <div>&gt; Transaction hash: 0x7a8f9b2c...</div>
                    <div>&gt; Gas used: 2,847,392</div>
                    <div>&gt; Confirmation: 12/12 nodes</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="space-y-2 text-matrix-glow">
                  <div className="font-semibold text-matrix-bright">📊 Election Statistics</div>
                  <div className="font-mono text-xs space-y-1">
                    <div>&gt; Registered voters: 15,847</div>
                    <div>&gt; Votes cast: {totalVotes.toLocaleString()}</div>
                    <div>&gt; Turnout: {((totalVotes / 15847) * 100).toFixed(1)}%</div>
                    <div>&gt; Invalid votes: 0</div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button className="matrix-button flex-1">
                    &gt; Download Audit Report
                  </Button>
                  <Button 
                    variant="outline" 
                    className="matrix-button flex-1"
                    onClick={() => window.location.href = '/verify'}
                  >
                    &gt; Verify My Vote
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};