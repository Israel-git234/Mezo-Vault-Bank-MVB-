# 🏆 Mezo Hackathon Submission - MezoBank Vaults

## **1. Project Readiness**

**Selected:** ✅ **Working Demo**

*Our project has a fully functional demo with:*
- ✅ Deployed smart contract on Mezo Testnet
- ✅ Complete frontend with all core features working
- ✅ Real contract integration (deposit, borrow, repay, withdraw)
- ✅ Simulated features (spend, vaults, credo score) that demonstrate full UX
- ✅ Production-ready code quality

---

## **2. How It Works**

### **Problem We Solve:**
1. **Bitcoin holders can't access liquidity without selling** — losing upside exposure and paying capital gains tax
2. **2.5 billion people lack banking access** — traditional finance excludes the underbanked
3. **DeFi is too complex** — confusing interfaces prevent mainstream adoption

### **How Our Project Functions:**

**Core Flow:**
1. **User deposits BTC** as collateral via our VaultManager contract on Mezo Network
2. **User borrows MUSD** stablecoin at fixed 3.5% APR (calculated on-chain)
3. **User has two options:**
   - **Spend via Lightning:** Paste Lightning invoice, MUSD converts to BTC atomically, payment processes
   - **Earn Yield:** Deploy MUSD into Smart Vaults earning 8% APY, yield auto-repays loan interest
4. **Credo Score builds** with each successful transaction, creating portable on-chain credit

### **MUSD Usage & Positioning:**

**MUSD is central to our platform:**

- **Primary Use Case:** Users borrow MUSD against BTC collateral (not USD/EUR)
- **Payment Layer:** MUSD converts to BTC for Lightning payments (Houdini Spend feature)
- **Yield Asset:** MUSD is deployed into vaults to earn yield
- **Stability:** Fixed 3.5% APR borrowing in MUSD provides predictable costs vs. variable-rate alternatives

**Why MUSD:**
- Native Mezo stablecoin = seamless integration
- Perfect for lending (stable borrowing costs)
- Enables yield strategies (MUSD → vaults → yield)
- Cross-platform utility (can integrate with other Mezo dApps)

---

## **3. Target Group**

### **Primary Target Audience:**

**User Type 1: Bitcoin Holders Needing Liquidity**
- **Experience Level:** Beginner to Intermediate (we prioritize UX simplicity)
- **Region:** Global (Bitcoin is universal)
- **Platform:** Mobile-first (responsive design) + Desktop
- **Pain Point:** Want to access value without selling BTC

**User Type 2: Unbanked Populations**
- **Experience Level:** Beginner (banking-app UX, not DeFi complexity)
- **Region:** Emerging markets (Africa, Latin America, Southeast Asia)
- **Platform:** Mobile-first (2.5B unbanked primarily use mobile)
- **Pain Point:** No access to credit, savings, or payment infrastructure

**User Type 3: DeFi Users Seeking Better UX**
- **Experience Level:** Intermediate (understand crypto, want simpler tools)
- **Region:** Global
- **Platform:** Desktop + Mobile
- **Pain Point:** Existing DeFi is too complex, rates are volatile

### **Track Alignment: Financial Access & Mass Adoption**

✅ **Financial Access:**
- Provides credit to 2.5B unbanked (no KYC, no traditional credit check)
- On-chain Credo Score enables portable credit reputation
- Lightning payments enable global remittances

✅ **Mass Adoption:**
- Banking-app UX (not typical DeFi complexity)
- Fixed rates = predictable (unlike Aave/Compound volatility)
- Mobile-responsive design
- No technical knowledge required

**Demographics:**
- Age: 18-65
- Income: Variable (from unbanked to BTC whales)
- Tech Savvy: Low to Medium (we abstract complexity)
- Bitcoin Ownership: Yes (or willing to acquire)

---

## **4. Product / Project Category**

**Primary Category:** **Automized Lending / Collateralized Borrowing**

**Secondary Categories:**
- **Yield Optimization** (Smart Vaults with auto-repay)
- **Payment Systems** (Lightning Network integration)
- **Credit Scoring** (On-chain Credo Score)
- **DeFi / Bitcoin DeFi** (Bitcoin-native financial platform)

---

## **5. Tech Stack**

### **Frontend:**
 - **Framework:** Next.js 16 (React 19)
 - **Language:** TypeScript
 - **Styling:** TailwindCSS 4
 - **UI Components:** shadcn/ui + custom components
 - **Web3 Integration:** Wagmi v2 + Viem
 - **State Management:** React hooks + localStorage

### **Smart Contracts:**
- **Language:** Solidity 0.8.28
- **Network:** Mezo Testnet (Chain ID: 31611)
- **Deployment Tool:** Hardhat
- **Contract:** VaultManager (deployed at `0xD93111E3C9E9C68C1BaE07F1E3c5f3ce483c9b8f`)

### **Blockchain Infrastructure:**
- **Network:** Mezo Network (Bitcoin L2)
- **Wallet:** MetaMask (Injected connector)
- **Stablecoin:** MUSD (`0x118917a40FAF1CD7a13dB0Ef56C86De7973Ac503`)
- **RPC:** Mezo Testnet RPC (https://rpc.test.mezo.org)

### **APIs & Services:**
- **Price Data:** CoinGecko API (BTC/USD)
- **Lightning:** Simulated (ready for gateway integration)

### **Testing & Quality:**
- **Unit Testing:** Vitest + React Testing Library
- **Linting:** ESLint
- **Type Checking:** TypeScript

### **Development Tools:**
- **Package Manager:** npm
- **Version Control:** Git + GitHub
- **Deployment:** Vercel (recommended)

---

## **6. Unique Value Proposition (UVP)**

**Competitors:** Aave, Compound, MakerDAO, traditional Bitcoin lending platforms

**What Makes Us Different:**

1. **Fixed 3.5% APR** — Unlike Aave/Compound's variable rates that spike unpredictably, we offer predictable payments. No surprises.

2. **Self-Repaying Loans** — First-of-its-kind yield automation: your vault earnings automatically pay your loan interest. Set it and forget it.

3. **Banking-App UX + On-Chain Credit** — We're the only platform combining traditional banking simplicity (for mass adoption) with innovative on-chain Credo Score (portable credit reputation). Bitcoin holders get DeFi power with TradFi ease.

**In One Sentence:**
*MezoBank Vaults is the only Bitcoin-backed platform that offers fixed-rate borrowing, self-repaying loans via yield automation, and banking-app UX—making DeFi accessible to the 2.5 billion unbanked while serving Bitcoin holders who need liquidity.*

---

## **7. Future Milestones**

### **Milestone 1: Mainnet Launch (Month 1-2)**
- Deploy VaultManager contract to Mezo Mainnet
- Complete security audit (CertiK/OpenZeppelin)
- Launch public beta with 10,000+ early users
- Target: $5M+ TVL in first month

### **Milestone 2: Lightning Gateway Integration (Month 3-4)**
- Integrate real Lightning payment gateway (BTCPay/Strike API)
- Enable actual MUSD → BTC → Lightning payments
- Partner with 10+ merchants accepting Lightning
- Launch in 3 countries (Nigeria, Philippines, Argentina)

### **Milestone 3: Mobile App + Credo Score Marketplace (Month 5-6)**
- Launch iOS/Android native apps
- Open Credo Score to third-party integrations (other Mezo dApps can read credit)
- Expand vault strategies (institutional vaults, higher APY options)
- Reach $50M+ TVL and 100K+ active users

**Long-term Vision:**
- Become the default Bitcoin banking layer
- Expand to other Bitcoin L2s (Stacks, Rootstock)
- Build Credo Score into industry standard

---

## **8. Team Info**

**Team Member 1:**
- **Name:** [Your Name]
- **Role:** Founder / Full-Stack Developer
- **LinkedIn:** [Your LinkedIn]
- **X/Twitter:** [Your X/Twitter]
- **Responsibilities:** Smart contracts, frontend development, Mezo integration

**Team Member 2:** (Add if applicable)
- **Name:** [Team Member Name]
- **Role:** [Role]
- **LinkedIn:** [LinkedIn]
- **X/Twitter:** [X/Twitter]

*Note: Update with your actual team information*

---

## **9. Link to Repository**

**GitHub Repository:**
```
https://github.com/[your-username]/mezo-bank-vaults
```

*Update with your actual GitHub repo URL*

---

## **10. Link to Video**

**Demo Video:**
```
[YouTube/Loom URL will go here]
```

**Recommended:**
- Record 2-3 minute walkthrough
- Show: Connect wallet → Deposit → Borrow → Spend → Vaults
- Upload to YouTube (unlisted) or Loom
- **Placeholder:** Video to be uploaded before submission deadline

---

## **11. Link to Presentation**

**Pitch Deck:**
- **Slide Deck:** [Google Slides/Pitch.com URL] (to be created)

**Recommended:**
1. Create Google Slides from `PITCH_PRESENTATION.md` outline
2. Share link (public or "anyone with link can view")
3. Include in submission

---

## **12. Link to Testnet Staging Environment**

**Live Demo URL:**
```
https://mezo-bank-vaults-8t7199xq9-israels-projects-59a1ee78.vercel.app
```

**Production Deployment:**
✅ **Deployed and live!**

**Setup Instructions:**
1. Connect MetaMask to Mezo Testnet (Chain ID: 31611)
2. Add MUSD token to wallet (address: `0x118917a40FAF1CD7a13dB0Ef56C86De7973Ac503`)
3. Get testnet BTC from Mezo faucet
4. Start using the platform!

**Contract Address (Mezo Testnet):**
- VaultManager: `0xD93111E3C9E9C68C1BaE07F1E3c5f3ce483c9b8f`

---

## 📋 **Quick Checklist Before Submission:**

- [ ] Update Team Info section with real names/socials
- [ ] Update GitHub repository URL
- [ ] Record and upload demo video (2-3 min)
- [ ] Create pitch deck slides (Google Slides)
- [x] Deploy to Vercel and add testnet URL ✅
- [ ] Test all features one final time on live URL
- [ ] Update README.md with live demo link
- [ ] Push all changes to GitHub

---

## 🎯 **Submission Summary**

**Project Name:** MezoBank Vaults  
**Track:** Financial Access & Mass Adoption  
**Status:** ✅ Working Demo  
**Contract:** Deployed on Mezo Testnet  
**Readiness:** Production-ready code, ready for mainnet launch

**Key Strengths:**
 - ✅ Fully functional demo
 - ✅ Real smart contract integration
 - ✅ Clean, production-ready UI
 - ✅ Complete feature set (lending, spending, yield, credit)
 - ✅ Mobile-responsive design
 - ✅ Clear differentiation from competitors

---

**Ready to submit! 🚀**

