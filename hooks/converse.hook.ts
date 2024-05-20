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

  const raw = JSON.stringify({
    content: content,
    threadId: threadId,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  return fetch("http://35.226.191.62/v1/converse", requestOptions).then(
    (res) => res.json()
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
