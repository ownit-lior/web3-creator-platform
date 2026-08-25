# פריסת DropFactory ל-Base Sepolia (Remix)

האפליקציה מחוברת ל-**DropFactory** הקיים תחת `contracts/src/` (לא ERC1155 נפרד).
הקובץ `DropFactory.flattened.sol` כולל את כל התלויות (OpenZeppelin) ומוכן להדבקה ב-Remix.

## שלב 1 — Remix

1. פתחו [Remix IDE](https://remix.ethereum.org)
2. צרו קובץ `DropFactory.sol` והדביקו את תוכן  
   `contracts/remix/DropFactory.flattened.sol`
3. Compiler → Solidity **0.8.24** (או 0.8.20+) → **Compile**
4. Deploy & Run → Environment: **Injected Provider - MetaMask**
5. MetaMask על **Base Sepolia** (עם ETH לניסוי)
6. ב־Contract בחרו **`DropFactory`** (לא CreatorShareToken / DropSale)
7. מילוי Constructor:
   - `platformTreasury_`: כתובת הארנק שלכם (או ארנק האוצר)
   - `liquidityTreasury_`: אותה כתובת / ארנק נזילות
   - `admin_`: אותה כתובת (מקבל CREATOR_ROLE אוטומטית)
8. **Deploy** → אשרו במטאמאסק

## שלב 2 — חיבור לאתר

העתיקו את כתובת החוזה מ־Deployed Contracts ב-Remix ל־`.env.local` בשורש הפרויקט:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_wc_project_id
NEXT_PUBLIC_DROP_FACTORY_ADDRESS=0xYourFactoryAddressHere
```

הפעילו מחדש:

```bash
npm run dev
```

ההודעה "חיבור לרשת הבלוקצ׳יין בטעינה…" בסטודיו תיעלם, וכפתור **השק on-chain** יהיה פעיל.

## שלב 3 — אחרי יצירת drop

כשיוצרים drop בסטודיו, המערכת מדפיסה כתובת `sale`. הוסיפו ל־`.env.local`:

```bash
NEXT_PUBLIC_DROP_SALE_ADDRESSES={"inv-m1":"0xSaleAddressFromEvent"}
```

ואז `/drop/inv-m1` → **השקע עכשיו** יעבוד מול `DropSale.buy()`.

## חלופה: Forge (CLI)

```bash
cd contracts
cp .env.example .env   # PRIVATE_KEY + PLATFORM_TREASURY + BASE_SEPOLIA_RPC_URL
forge script script/Deploy.s.sol:DeployScript --rpc-url $BASE_SEPOLIA_RPC_URL --broadcast
```

## מבנה החוזים (מה שה-Factory יוצר)

| חוזה | תפקיד |
|------|--------|
| `CreatorShareToken` | ERC-20 של מניות תמלוגים + vesting |
| `DropSale` | גיוס ראשוני + פיצול עמלות |
| `RoyaltyVault` | חלוקת תמלוגים למחזיקים |
| `SecondaryMarket` | מסחר משני (נוצר עם ה-Factory) |
