import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

enum Currency {
  USD,
  BTC,
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  let curr = Currency.USD;
  if (message?.button === 3) {
    curr = Currency.BTC;
  }

  // TODO function for getting the price...
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        { label: 'Get ETH price' },
        { label: 'USD / ETH price', action: 'post' },
        { label: 'ETH / USD', action: 'post' },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/LionCoin.png`,
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
