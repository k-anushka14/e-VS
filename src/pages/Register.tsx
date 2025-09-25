import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export const Register = () => {
  const [step, setStep] = useState<'upload' | 'hash' | 'biometric' | 'verify' | 'complete'>('upload');
  const [idFile, setIdFile] = useState<File | null>(null);
  const [digitalFingerprint, setDigitalFingerprint] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hash ID using WebCrypto
  const hashIDDocument = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleIDUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIdFile(file);
    setIsProcessing(true);
    setStep('hash');

    try {
      // Simulate processing delay with glitch effect
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const hash = await hashIDDocument(file);
      setDigitalFingerprint(hash);
      
      toast.success('Digital fingerprint created successfully!', {
        description: 'Your ID has been securely hashed and anonymized.'
      });
      
      setStep('biometric');
    } catch (error) {
      toast.error('Failed to process ID document');
      setStep('upload');
    } finally {
      setIsProcessing(false);
    }
  };

  const startBiometricVerification = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStep('verify');
    } catch (error) {
      toast.error('Camera access denied. Proceeding without biometric verification.');
      setStep('verify');
    }
  };

  const verifyVoterEligibility = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate blockchain verification
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock successful verification
      toast.success('Voter verification successful!', {
        description: 'You are now registered and eligible to vote.'
      });
      
      setStep('complete');
    } catch (error) {
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold matrix-text mb-4">
            <span className="animate-digital-form">VOTER REGISTRATION</span>
          </h1>
          <p className="text-matrix-glow text-lg">
            Secure identity verification through blockchain technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Registration Flow */}
          <Card className="matrix-terminal">
            <CardHeader>
              <CardTitle className="matrix-text flex items-center">
                <span className="text-matrix-bright mr-2">&gt;</span>
                {step === 'upload' && 'Upload ID Document'}
                {step === 'hash' && 'Creating Digital Fingerprint'}
                {step === 'biometric' && 'Biometric Verification'}
                {step === 'verify' && 'Blockchain Verification'}
                {step === 'complete' && 'Registration Complete'}
              </CardTitle>
              <CardDescription className="text-matrix-glow">
                {step === 'upload' && 'Upload your government-issued ID for secure hashing'}
                {step === 'hash' && 'Generating anonymous digital fingerprint...'}
                {step === 'biometric' && 'Optional: Verify your identity with biometric data'}
                {step === 'verify' && 'Verifying against electoral blockchain...'}
                {step === 'complete' && 'You are now registered to vote!'}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step 1: ID Upload */}
              {step === 'upload' && (
                <div className="space-y-4">
                  <Label htmlFor="id-upload" className="matrix-text">
                    Select ID Document (Aadhaar, Voter ID, Driver's License)
                  </Label>
                  <Input
                    ref={fileInputRef}
                    id="id-upload"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleIDUpload}
                    className="matrix-input"
                  />
                  <p className="text-sm text-matrix-glow">
                    Your document will be hashed locally and never stored in its original form.
                  </p>
                </div>
              )}

              {/* Step 2: Hashing Process */}
              {step === 'hash' && (
                <div className="text-center py-8">
                  <div className="animate-glitch matrix-text text-2xl mb-4">
                    PROCESSING...
                  </div>
                  <div className="space-y-2 font-mono text-sm text-matrix-glow">
                    <div className="animate-pulse">&gt; Reading document data...</div>
                    <div className="animate-pulse">&gt; Applying SHA-256 hash...</div>
                    <div className="animate-pulse">&gt; Generating fingerprint...</div>
                    <div className="animate-pulse">&gt; Securing identity...</div>
                  </div>
                </div>
              )}

              {/* Step 3: Biometric Verification */}
              {step === 'biometric' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-sm text-matrix-glow mb-4">
                      Digital Fingerprint: 
                      <span className="font-mono text-xs block mt-1 break-all">
                        {digitalFingerprint.slice(0, 32)}...
                      </span>
                    </div>
                    <Button 
                      onClick={startBiometricVerification}
                      className="matrix-button w-full"
                    >
                      &gt; Start Biometric Verification
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => setStep('verify')}
                      className="w-full mt-2 text-matrix-glow hover:text-matrix-bright"
                    >
                      Skip Biometric (Proceed with ID only)
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Blockchain Verification */}
              {step === 'verify' && (
                <div className="space-y-4">
                  <video 
                    ref={videoRef}
                    autoPlay 
                    muted 
                    className="w-full max-w-md mx-auto rounded-lg border border-primary/30"
                    style={{ display: videoRef.current?.srcObject ? 'block' : 'none' }}
                  />
                  
                  <div className="text-center">
                    {isProcessing ? (
                      <div className="py-8">
                        <div className="animate-matrix-glow text-2xl matrix-text mb-4">
                          VERIFYING...
                        </div>
                        <div className="space-y-2 font-mono text-sm text-matrix-glow">
                          <div className="animate-pulse">&gt; Checking electoral blockchain...</div>
                          <div className="animate-pulse">&gt; Validating voter eligibility...</div>
                          <div className="animate-pulse">&gt; Generating voter token...</div>
                        </div>
                      </div>
                    ) : (
                      <Button 
                        onClick={verifyVoterEligibility}
                        className="matrix-button w-full"
                      >
                        &gt; Verify Voter Eligibility
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Step 5: Complete */}
              {step === 'complete' && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">✓</div>
                  <div className="text-2xl matrix-text mb-4 animate-digital-form">
                    REGISTRATION COMPLETE
                  </div>
                  <p className="text-matrix-glow mb-6">
                    You have been successfully registered in the voting system.
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/vote'}
                    className="matrix-button"
                  >
                    &gt; Proceed to Vote
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Information */}
          <Card className="matrix-terminal">
            <CardHeader>
              <CardTitle className="matrix-text">
                <span className="text-matrix-bright mr-2">&gt;</span>
                Security Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="space-y-3 text-matrix-glow">
                <div>
                  <div className="font-semibold text-matrix-bright">🔒 Privacy Protected</div>
                  <div>Your ID is hashed locally using SHA-256. Only the hash is stored on-chain.</div>
                </div>
                
                <div>
                  <div className="font-semibold text-matrix-bright">🔗 Blockchain Secured</div>
                  <div>Immutable voter registration prevents tampering and ensures integrity.</div>
                </div>
                
                <div>
                  <div className="font-semibold text-matrix-bright">🎯 One Vote Policy</div>
                  <div>Voter tokens are burned after use, preventing double voting.</div>
                </div>
                
                <div>
                  <div className="font-semibold text-matrix-bright">🛡️ Encrypted Votes</div>
                  <div>All votes are encrypted client-side before blockchain submission.</div>
                </div>
              </div>

              {digitalFingerprint && (
                <div className="mt-6 p-4 bg-primary/10 rounded border border-primary/30">
                  <div className="text-matrix-bright font-semibold mb-2">Your Digital Identity</div>
                  <div className="font-mono text-xs break-all text-matrix-glow">
                    {digitalFingerprint}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};