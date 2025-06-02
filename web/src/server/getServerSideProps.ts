import { config } from "@/assets/config/config";
//import { cookies } from "next/headers";

export async function getServerSideProps(url: string) {
  //const cookieStore = await cookies();
  // const token = cookieStore.get("token")?.value;
  try {
    const res = await fetch(`${config.API_URL}/${url}`, {
      cache: "no-store",

      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        // Cookie: `token=${token}`,
      },
    });
    if (!res.ok) {
      return;
    }
    if (res.status === 401) {
      return;
    }
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return;
    }
    const data = await res.json();
    console.log("DATA: ", data);
    return data.data;
  } catch (error) {
    console.log("error");
    console.log(error);
  }
}
