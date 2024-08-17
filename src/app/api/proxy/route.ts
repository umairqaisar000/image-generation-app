import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const prompt = url.searchParams.get('prompt');

        if (!prompt) {
            return NextResponse.json({ error: 'Missing prompt parameter' }, { status: 400 });
        }

        const response = await fetch(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`);
        const contentType = response.headers.get('content-type');

        if (response.ok) {
            const imageBuffer = await response.arrayBuffer();
            return new NextResponse(imageBuffer, {
                headers: {
                    'Content-Type': contentType || 'image/jpeg',
                },
            });
        } else {
            return NextResponse.json({ error: response.statusText }, { status: response.status });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
