import Header from "@/components/Header";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { User, Award, History, Shield, TrendingUp, CheckCircle } from "lucide-react";
import { formatMUSD } from "@/lib/utils";

export default function ProfilePage() {
  // Mock data - will be replaced with actual Mezo Passport & Credo data
  const userProfile = {
    address: "0xcbb...2F2F",
    passportVerified: true,
    credoScore: 750,
    credoLevel: "Gold",
    accountAge: 45, // days
    totalLoans: 3,
    onTimeRepayments: 3,
    totalBorrowed: 50000,
    totalRepaid: 15000,
  };

  const activityHistory = [
    { id: 1, type: "Deposit", amount: "0.5 BTC", date: "2 days ago", status: "Completed" },
    { id: 2, type: "Borrow", amount: "15,000 MUSD", date: "2 days ago", status: "Active" },
    { id: 3, type: "Repay", amount: "5,000 MUSD", date: "5 days ago", status: "Completed" },
  ];

  const getCredoLevelColor = (level: string) => {
    switch (level) {
      case "Platinum": return "from-slate-400 to-slate-600";
      case "Gold": return "from-yellow-400 to-yellow-600";
      case "Silver": return "from-gray-300 to-gray-500";
      default: return "from-orange-400 to-orange-600";
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 gradient-text">Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your Mezo Passport, Credo Score, and account activity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="space-y-6">
            {/* Mezo Passport Card */}
            <Card className="text-center">
              <div className="w-20 h-20 gradient-bg rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-bold mb-2">Mezo Passport</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {userProfile.address}
              </p>
              {userProfile.passportVerified ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Verified</span>
                </div>
              ) : (
                <Button variant="default" size="sm">
                  Verify Passport
                </Button>
              )}
            </Card>

            {/* Account Stats */}
            <Card>
              <h3 className="text-lg font-bold mb-4">Account Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Account Age</span>
                  <span className="font-semibold">{userProfile.accountAge} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Loans</span>
                  <span className="font-semibold">{userProfile.totalLoans}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">On-Time Repayments</span>
                  <span className="font-semibold text-green-600">{userProfile.onTimeRepayments}/{userProfile.totalLoans}</span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Borrowed</span>
                  <span className="font-semibold">{formatMUSD(userProfile.totalBorrowed)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Repaid</span>
                  <span className="font-semibold">{formatMUSD(userProfile.totalRepaid)}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Middle Column - Credo Score */}
          <div className="lg:col-span-2 space-y-6">
            {/* Credo Score Card */}
            <Card className={`bg-gradient-to-br ${getCredoLevelColor(userProfile.credoLevel)} text-white`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Credo Score</h2>
                  <p className="text-white/80 text-sm">Your on-chain credit reputation</p>
                </div>
                <Award className="w-12 h-12 text-white/80" />
              </div>
              
              <div className="text-center mb-6">
                <div className="text-6xl font-bold mb-2">{userProfile.credoScore}</div>
                <div className="text-xl font-semibold">{userProfile.credoLevel} Level</div>
              </div>

              <div className="bg-white/20 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Score Range</span>
                  <span className="text-sm font-medium">0 - 1000</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2 mb-2">
                  <div 
                    className="bg-white h-2 rounded-full" 
                    style={{ width: `${(userProfile.credoScore / 1000) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-white/80">
                  {userProfile.credoScore >= 900 ? "Excellent credit!" : 
                   userProfile.credoScore >= 750 ? "Good credit standing" :
                   userProfile.credoScore >= 600 ? "Fair credit" : "Building credit"}
                </p>
              </div>
            </Card>

            {/* Score Factors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Repayment History</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      100% on-time payments
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Yield Participation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Active in 2 vaults
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <History className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Account Age</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {userProfile.accountAge} days
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Collateral Ratio</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Healthy (175%)
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {activityHistory.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === "Deposit" ? "bg-green-100 dark:bg-green-900/30" :
                        activity.type === "Borrow" ? "bg-blue-100 dark:bg-blue-900/30" :
                        "bg-purple-100 dark:bg-purple-900/30"
                      }`}>
                        <History className={`w-5 h-5 ${
                          activity.type === "Deposit" ? "text-green-600" :
                          activity.type === "Borrow" ? "text-blue-600" :
                          "text-purple-600"
                        }`} />
                      </div>
                      <div>
                        <p className="font-semibold">{activity.type}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{activity.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{activity.amount}</p>
                      <p className={`text-xs ${
                        activity.status === "Completed" ? "text-green-600" : "text-blue-600"
                      }`}>
                        {activity.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Transactions
              </Button>
            </Card>

            {/* Benefits Card */}
            <Card gradient>
              <h3 className="text-xl font-bold mb-3 text-white">Improve Your Credo Score</h3>
              <ul className="space-y-2 text-sm text-white/90">
                <li>✓ Make on-time loan repayments</li>
                <li>✓ Participate in yield vaults</li>
                <li>✓ Maintain healthy collateral ratios</li>
                <li>✓ Build account history over time</li>
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}



