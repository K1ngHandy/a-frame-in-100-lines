enum Currency {
  USD,
  BTC,
}

export const createTextAndImageOverlay = async (currency: Currency) => {
  const apiKeyToken = process.env.ETHERSCAN;

  const url = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${apiKeyToken}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch ETH price');
    }

    const data = await response.json();

    const textCurrency = currency === Currency.USD ? data.result.ethusd : data.result.ethbtc;
  }
};
