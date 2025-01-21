import { neon } from '@neondatabase/serverless';

export async function GET() {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const response = await sql`Select * FROM drivers`;

        return new Response(JSON.stringify({ data: response }), { status: 200, });
    } catch (error) {
        console.error("Error creating user:", error);
        return Response.json({ error: error }, { status: 500 });
    }
} 