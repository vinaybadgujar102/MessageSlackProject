/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueryClient } from "@tanstack/react-query";

import { uploadImageToAWSpresignedUrl } from "@/apis/s3";
import { getPreginedUrl } from "@/apis/s3";
import { Editor } from "@/components/atoms/Editor/Editor";
import { useSocket } from "@/context/useSocket";
import { useAuth } from "@/hooks/context/useAuth";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";

export const ChatInput = () => {
  const { socket, currentChannel } = useSocket();
  const { auth } = useAuth();
  const { currentWorkspace } = useCurrentWorkspace();
  const queryClient = useQueryClient();

  async function handleSubmit({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) {
    console.log(body, image);
    let fileUrl = null;
    if (image) {
      const preSignedUrl = await queryClient.fetchQuery({
        queryKey: ["getPresignedUrl"],
        queryFn: () => getPreginedUrl({ token: auth?.token || "" }),
      });

      console.log("Presigned url", preSignedUrl);

      const responseAws = await uploadImageToAWSpresignedUrl({
        url: preSignedUrl,
        file: image,
      });
      console.log("file upload success", responseAws);
      fileUrl = preSignedUrl.split("?")[0];
    }
    socket?.emit(
      "NewMessage",
      {
        channelId: currentChannel,
        body,
        image: fileUrl,
        senderId: auth?.user?._id,
        workspaceId: currentWorkspace?._id,
      },
      (data: any) => {
        console.log("Message sent", data);
      }
    );
  }

  return (
    <div className="px-5 w-full">
      <Editor
        //placeholder="Type a message..."
        onSubmit={handleSubmit}
        //onCancel={() => {}}
        //disabled={false}
        //defaultValue=""
      />
    </div>
  );
};
