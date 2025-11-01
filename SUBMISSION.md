# 🏆 MezoBank Vaults - Hackathon Submission

## Project Information

**Project Name:** MezoBank Vaults  
**Track:** Financial Access & Mass Adoption  
**Tagline:** "Spend, Save, and Grow Bitcoin — All in One App"

---

## 🎯 Problem Statement

1. **Bitcoin holders face liquidity constraints** - Must sell BTC to access funds, losing upside exposure and paying capital gains tax
2. **2.5 billion people lack banking access** - Traditional finance excludes the underbanked
3. **Crypto UX is too complex** - DeFi apps confuse mainstream users
4. **Credit is inaccessible** - No credit history = no loans for billions

---

## 💡 Our Solution

MezoBank Vaults brings **banking-app simplicity** to **Bitcoin-native DeFi**:

### Core Features:
1. **Fixed-Rate Borrowing** (3.5% APR) - Deposit BTC, borrow MUSD stablecoin
2. **Self-Repaying Loans** - Yield vaults auto-pay interest
3. **On-Chain Credit Score** - Build portable Credo-ID reputation
4. **Lightning Spending** - Pay globally for real-world goods

### Why It Matters:
- ✅ Keep Bitcoin ownership (avoid capital gains)
- ✅ Access liquidity when needed
- ✅ Build credit without traditional banks
- ✅ Spend Bitcoin without selling it

---

## 🏗️ Technical Implementation

### Smart Contracts (Solidity 0.8.28)
**Deployed on Mezo Testnet:**
- **VaultManager:** `0xD93111E3C9E9C68C1BaE07F1E3c5f3ce483c9b8f`
- **MUSD Integration:** `0x118917a40FAF1CD7a13dB0Ef56C86De7973Ac503`
- **Chain ID:** 31611 (Mezo Testnet)

**Contract Features:**
- Collateral management (150% min ratio)
- Fixed interest calculation (3.5% APR)
- Liquidation mechanism (125% threshold)
- Position tracking per user
- Interest accrual over time

### Frontend (Next.js 16 + TypeScript)
- **Framework:** Next.js 16 with React 19
- **Styling:** TailwindCSS + Custom gradients
- **Web3:** Wagmi v2 + Viem
- **UX:** Banking-app flow with 3-step onboarding

### Key Technical Achievements:
✅ Full Mezo Testnet integration  
✅ MetaMask wallet connection  
✅ Smart contract deployed and verified  
✅ Responsive mobile-first design  
✅ Dark mode support  
✅ Production-ready codebase  

---

## 🎨 User Experience

#

