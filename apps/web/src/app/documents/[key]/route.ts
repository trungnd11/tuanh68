import { getInvestorServedDocumentByKey } from "@/app/sections/investor-materials/server/documents";

export async function GET(request: Request, context: { params: Promise<{ key: string }> }) {
  const { key } = await context.params;
  const document = await getInvestorServedDocumentByKey(key);

  if (!document) {
    return new Response("Not Found", { status: 404 });
  }

  const searchParams = new URL(request.url).searchParams;
  const isDownload = searchParams.get("download") === "1";
  const targetUrl = isDownload ? document.downloadUrl : document.viewUrl;

  if (!targetUrl) {
    return new Response("Not Found", { status: 404 });
  }

  return Response.redirect(targetUrl, 307);
}
