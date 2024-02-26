import { createCanvas, registerFont } from 'canvas';
import { register } from 'module';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

enum Currency {
  USD,
  BTC,
}

export const createTextAndImageOverlay = async (currency: Currency) => {
  const apiKeyToken = process.env.ETHERSCAN;

  const url = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${apiKeyToken}`; // your API token

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch ETH price');
    }

    const data = await response.json();

    const textCurrency = currency === Currency.USD ? data.result.ethusd : data.result.ethbtc; // USD or BTC ETH price

    const canvas = createCanvas(256, 417);

    const ctx = canvas.getContext('2d');

    registerFont(path.resolve('./public/fonts/Montserrat-BlackItalic.ttf'), {
      family: 'Montserrat-BlackItalic',
    });

    ctx.fillStyle = '#FDFD96'; // yellow for text

    ctx.font = '48px Montserrat';

    ctx.fillText(textCurrency, 10, 180);

    const textBuffer = canvas.toBuffer('image/png'); // create a buffer from canvas

    const ethImagePath = path.resolve('./public/LionCoin.png');

    const ethImageBuffer = fs.readFileSync(ethImagePath); // read the image

    const newImageBuffer = await sharp(ethImageBuffer)
      .composite([{ input: textBuffer }]) // fill buffer "text as image"
      .toBuffer(); // composite the text on coin image

    return { textCurrency, newImageBuffer };
  } catch (error) {
    const ethImagePath = path.resolve('./public/LionCoin.png');
    return { textCurrency: 'Error', newImageBuffer: ethImagePath };

    console.error('Failed to fetch price', error);
  }
};
