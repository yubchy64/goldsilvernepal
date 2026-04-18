# Product Requirements Document: Nepal Gold & Silver Tracker

## 1. Executive Summary

**Problem Statement**:  
There is no centralized, easy-to-use platform for Nepali consumers and investors to track real-time gold and silver prices. Current price information is scattered across various jeweler websites and lacks standardization.

**Proposed Solution**:  
A static web application that provides real-time gold and silver price tracking with multiple unit conversions, historical trends, and educational content about precious metal investments in Nepal.

**Success Criteria**:
- Display prices updated daily from FENEGOSIDA (Federation of Nepal Gold and Silver Dealers' Association)
- Support unit conversions: Tola, Gram, Kg, Masha, Grain
- Page load time < 2 seconds
- Mobile-responsive design
- GitHub Actions automation for price updates

---

## 2. User Experience & Functionality

### User Personas

| Persona | Description | Needs |
|---------|-------------|-------|
| **Jewelry Buyer** | Individual purchasing gold/silver jewelry | Current prices, unit conversion |
| **Investor** | Person investing in precious metals | Historical trends, market insights |
| **Jeweler** | Shop owner needing reference prices | Accurate daily rates |
| **Remittance Worker** | Nepali abroad sending money home | Price trends for timing purchases |

### User Stories

**Story 1: Price Checking**  
*As a jewelry buyer, I want to see today's gold and silver prices so that I can plan my purchase.*

**Acceptance Criteria:**
- [ ] Display Fine Gold price per Tola prominently
- [ ] Display Silver price per Tola prominently
- [ ] Show last updated timestamp
- [ ] Visual indicators for price trends

**Story 2: Unit Conversion**  
*As a buyer, I want to convert prices between different units so that I can compare with seller quotes.*

**Acceptance Criteria:**
- [ ] Support Tola, Gram, Kg, Masha, Grain units
- [ ] Real-time conversion as user inputs quantity
- [ ] Display both gold and silver for selected unit

**Story 3: Historical Analysis**  
*As an investor, I want to understand price patterns so that I can time my investments.*

**Acceptance Criteria:**
- [ ] Display seasonal demand patterns (Dashain, Tihar, Wedding season)
- [ ] Explain factors affecting prices (USD/NPR exchange rate)
- [ ] Investment considerations section

**Story 4: Educational Content**  
*As a new investor, I want to learn about gold/silver investment basics.*

**Acceptance Criteria:**
- [ ] FAQ section with common questions
- [ ] Investment guide with pros/cons
- [ ] About section explaining data sources
- [ ] Disclaimer about financial advice

### Non-Goals
- ❌ Real-time trading or transactions
- ❌ User accounts or personalization
- ❌ Push notifications
- ❌ Price alerts
- ❌ AI-generated content
- ❌ Multi-language support (v1)

---

## 3. Data Sources & Automation

**Primary Data Source**:  
FENEGOSIDA (Federation of Nepal Gold and Silver Dealers' Association) website scraped daily via GitHub Actions.

**Data Flow**:
```
FENEGOSIDA Website
       ↓
scraper/scrape_fenegosida.py
       ↓
data/live-prices.json (auto-committed)
       ↓
App displays prices
```

**Fallback Mechanism**:  
If scraper fails, app uses `data/prices.ts` with manually configured fallback prices.

---

## 4. Technical Specifications

### Architecture Overview

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 |
| Deployment | Static hosting (Vercel) |
| Automation | GitHub Actions (daily cron) |

### Data Schema

```typescript
interface PriceData {
  fineGoldPerTola: number;   // NPR per Tola
  silverPerTola: number;     // NPR per Tola
  lastUpdated: string;       // YYYY-MM-DD
}
```

### Automation

- **Schedule**: Daily at scheduled time via GitHub Actions
- **File**: `.github/workflows/update-prices.yml`
- **Output**: `data/live-prices.json` and `public/data/live-prices.json`

---

## 5. Risks & Roadmap

### Phased Rollout

| Phase | Timeline | Features |
|-------|----------|----------|
| **MVP** | Week 1-2 | Price display, unit converter, basic UI |
| **v1.1** | Week 3-4 | Historical charts, FAQ, SEO optimization |
| **v1.2** | Month 2 | Investment guide, About section |
| **v2.0** | Month 3 | Multi-language (Nepali), PWA support |

### Technical Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| FENEGOSIDA website changes | High | Fallback to manual price entry |
| Scraper failures | Medium | GitHub Actions retry logic |
| Mobile performance | Medium | Lighthouse CI, code splitting |

---

## 6. Design Specifications

- **Primary Color**: `#fa5d19` (Orange accent)
- **Background**: `#f9f9f9` (Light gray)
- **Typography**: Suisse font family with tight letter-spacing
- **Border Radius**: 8px-10px for cards and buttons

See `DESIGN.md` for complete design system details.
