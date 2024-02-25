import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
      {label: "Get ETH price"},
      {label: "USD / ETH price"},
      {label: "ETH / USD"},
    ],
    
    image: {
      src: `${NEXT_PUBLIC_URL}/park-3.png`,
      aspectRatio: '1:1',
    },

    postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'zizzamia.xyz',
  description: 'LFG',
  openGraph: {
    title: 'zizzamia.xyz',
    description: 'LFG',
    images: [`${NEXT_PUBLIC_URL}/park-1.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>ETH / USD Frame</h1>
    </>
  );
}
