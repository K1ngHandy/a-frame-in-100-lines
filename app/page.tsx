import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
      {label: "Get ETH price"},
      {label: "USD / ETH price", action: 'post'},
      {label: "ETH / USD", action: 'post'},
    ],
    
    image: {
      src: `${NEXT_PUBLIC_URL}/LionCoin.png`,
      aspectRatio: '1:1',
    },

    postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  metadataBase: new URL(NEXT_PUBLIC_URL),
  title: 'lioncoin.xyz',
  description: 'LFG',
  openGraph: {
    title: 'lioncoin.xyz',
    description: 'LFG',
    images: [`${NEXT_PUBLIC_URL}/LionCoin.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1><a href='https://etherscan.io'>ETH / USD Frame</a></h1>
    </>
  );
}
