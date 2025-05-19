declare module "@vercel/node" {
  export interface VercelRequest extends Request {
    query: { [key: string]: string | string[] | undefined };
    cookies: { [key: string]: string };
  }

  export interface VercelResponse {
    status: (statusCode: number) => VercelResponse;
    json: (body: any) => VercelResponse;
    end: () => void;
    setHeader: (name: string, value: string) => void;
  }
}
