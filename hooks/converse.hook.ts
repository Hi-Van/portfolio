import useSWR from "swr";

const fetcher = async (
  content: string,
  threadId?: string
): Promise<{
  content: string;
  threadId: string;
}> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("origin", window.location.origin);

  const raw = JSON.stringify({
    content: content,
    threadId: threadId,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  return fetch("https://34.44.209.48/v1/converse", requestOptions).then((res) =>
    res.json()
  );
};

export const useConverse = (content: string, threadId?: string) => {
  return useSWR<
    {
      content: string;
      threadId: string;
    },
    Error
  >(["converse", content], (_key: string) => fetcher(content, threadId));
};
